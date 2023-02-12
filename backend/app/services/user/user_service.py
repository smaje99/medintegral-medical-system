from typing import Any
from uuid import UUID

from sqlalchemy.orm import lazyload, Session
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import asc, cast, or_, select, true
from sqlalchemy.sql.functions import array_agg
from sqlalchemy.sql.sqltypes import Text

from app.core.config import settings
from app.core.email import send_new_account_email
from app.core.exceptions import IncorrectCredentialsException
from app.core.security.pwd import get_password_hash, verify_password
from app.models.person import Person
from app.models.user import Permission, RolePermission, UserPermission, User
from app.schemas.user.permission import PermissionInUser
from app.schemas.user.user import UserCreate, UserUpdate, UserUpdatePassword
from app.services import BaseService


class UserService(BaseService[User, UserCreate, UserUpdate]):
    '''Service that provides CRUD operations and authentication
    for a user model.

    Args:
        BaseService ([User, UserCreate, UserUpdate]): Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: Session):
        return cls(model=User, database=database)

    def get_by_username(self, username: str) -> User | None:
        '''Retrieve a user by username.

        Args:
            username (str): User identifier name.

        Returns:
            User | None: A user if exists, None otherwise.
        '''
        return (
            self.database.query(User)
            .options(lazyload(User.person), lazyload(User.role))
            .filter(User.username == username)
            .first()
        )

    def get_by_email(self, email: str) -> User | None:
        '''Retrieve a user by email.

        Args:
            username (str): Email identifier name.

        Returns:
            User | None: A user if exists, None otherwise.
        '''
        return (
            self.database.query(User)
            .join(Person, Person.dni == User.dni)
            .filter(Person.email == email)
            .first()
        )

    def create(self, obj_in: UserCreate) -> User:
        '''Create a new user by encrypting password.

        Args:
            obj_in (UserCreate): User data to be recorded.

        Returns:
            User: User data recorded.
        '''
        db_obj = User(
            dni=obj_in.dni,
            hashed_password=get_password_hash(obj_in.password),
            role_id=obj_in.role_id,  # type: ignore
        )

        self.database.add(db_obj)
        self.database.commit()
        self.database.refresh(db_obj)

        return db_obj

    def update(self, *, db_obj: User, obj_in: UserUpdate | dict[str, Any]) -> User:
        '''Update a user data recorded, encrypting the password
        if it's present in the data to be updated.

        Args:
            db_obj (User): Current user data recorded to be updated
            obj_in (UserUpdate | dict[str, Any]): User data to be updated.

        Raises:
            ValueError: The record doesn't exist in the given model.

        Returns:
            User: User data updated.
        '''
        update_data = (
            obj_in if isinstance(obj_in, dict) else obj_in.dict(exclude_unset=True)
        )

        if update_data.get('password', False):
            hashed_password = get_password_hash(update_data['password'])
            del update_data['password']
            update_data['hashed_password'] = hashed_password

        return super().update(db_obj=db_obj, obj_in=update_data)

    def authenticate(self, *, username: str, password: str) -> User:
        '''Authenticates a user's credentials.

        Args:
            username (str): User identifier name.
            password (str): User password.

        Returns:
            User | None: A user if the credentials are correct, None otherwise.
        '''
        user = self.get_by_username(username)

        if not user:
            raise IncorrectCredentialsException('Usuario no encontrado')

        if not verify_password(password, user.hashed_password):
            raise IncorrectCredentialsException('Contraseña incorrecta')

        return user

    def is_active(self, user: User) -> bool:
        '''Check if the user is active.

        Args:
            user (User): The user to check.

        Returns:
            bool: The user's active status.
        '''
        return user.is_active

    def contains(self, user_id: int) -> bool:
        '''Checks if the user model contains the given id.

        Args:
            user_id (int): The ID of the user to check for.

        Returns:
            bool: True if the user exists, False otherwise.
        '''
        query = self.database.query(User).filter(User.dni == user_id)
        return self.database.query(query.exists()).scalar()

    def contains_by_username(self, username: str) -> bool:
        '''Checks if the user model contains the given username.

        Args:
            username (str): The username of the user to check for.

        Returns:
            bool: True if the user exists, False otherwise.
        '''
        query = self.database.query(User).filter(User.username == username)
        return self.database.query(query.exists()).scalar()

    def update_password(self, *, db_user: User, user_in: UserUpdatePassword) -> User:
        '''Update an user's password.

        Args:
            db_user (User): User recorded.
            user_in (UserUpdatePassword): New user's password.

        Returns:
            User: User data with updated and hashed password.
        '''
        if not verify_password(user_in.old_password, db_user.hashed_password):
            raise IncorrectCredentialsException('Contraseña incorrecta')

        if not (user := self.get_by_username(str(db_user.username))):
            raise ValueError('Usuario no encontrado')

        update_data = {'password': user_in.new_password}
        return self.update(db_obj=user, obj_in=update_data)

    def send_new_account_email(self, *, user: User, password: str):
        '''Send a new account email to the given user.
        This is if the system supports it.

        Args:
            user (User): User to send the email to.
            password(str): User's password.
        '''
        if settings.email.emails_enabled:
            send_new_account_email(
                email_to=user.person.email,
                username=user.username or '',
                password=password,
            )

    def get(self, id: int) -> User | None:  # pylint: disable=C0103, W0622
        if user := super().get(id):
            user.permissions = self.get_permissions_for_user(user=user)  # type: ignore
            user.person.age = self.get_age_for_user(user=user)  # type: ignore

        return user

    def get_age_for_user(self, *, user: User) -> str:
        '''Calculates the age of a given user.

        Args:
            user (User): Given user.

        Returns:
            str: User's age.
        '''
        return (
            self.database.query(cast(func.age(Person.birthdate), Text).label('age'))
            .filter(Person.dni == user.dni)
            .scalar()
        )

    def get_permissions_for_user(self, *, user: User) -> list[PermissionInUser]:
        '''List of permissions of a user and its role.

        Args:
            user (User): User to retrieve permissions for.

        Returns:
            list[PermissionInUser]: List of permissions.
        '''
        role_subquery = self.__get_permissions_from(
            RolePermission, with_id=user.role.id  # type: ignore
        )
        user_subquery = self.__get_permissions_from(
            UserPermission, with_id=user.dni  # type: ignore
        )
        permissions_subquery = role_subquery.union(user_subquery).alias('permissions')
        actions_agg = array_agg(permissions_subquery.c.action).label('actions')

        return self.database.execute(
            select(permissions_subquery.c.name, actions_agg)
            .distinct()
            .group_by(permissions_subquery.c.name)
        ).all()

    def __get_permissions_from(
        self, model: RolePermission | UserPermission, *, with_id: int | UUID
    ):
        '''Query to fetch the permissions and actions
        of the given role or user.

        Args:
            model (RolePermission | UserPermission):
            Role or user permissions model.
            with_id (int | UUID): Role or user ID.

        Returns:
            subquery: Permissions query.
        '''
        return (
            select(Permission.name, model.action)  # type: ignore
            .join(
                Permission,  # type: ignore
                model.permission_id == Permission.id,  # type: ignore
                isouter=True,
            )
            .filter(
                with_id
                == (
                    model.role_id  # type: ignore
                    if model.__name__ == 'RolePermission'
                    else model.user_id  # type: ignore
                )
            )
            .filter(model.is_active == true())
        )

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[User]:
        return (
            self.database.query(User)
            .filter(User.is_active == true())
            .order_by(asc(User.username))
            .order_by(asc(User.created_at))
            .slice(skip, limit)
            .all()
        )

    def search_by_dni(self, dni: int) -> list[User]:
        '''Search for users by a given DNI.

        Args:
            dni (int): DNI given for the search.

        Returns:
            list[User]: List of users who start their DNI with the given.
        '''
        return (
            self.database.query(User)
            .filter(or_(User.dni == dni, cast(User.dni, Text).startswith(str(dni))))
            .order_by(asc(User.dni))
            .order_by(asc(User.username))
            .order_by(asc(User.created_at))
            .all()
        )
