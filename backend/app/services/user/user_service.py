from typing import Any
from uuid import UUID

from sqlalchemy.orm import lazyload, Session
from sqlalchemy.sql.expression import asc, select, true
from sqlalchemy.sql.functions import array_agg

from app.core.config import settings
from app.core.email import send_new_account_email
from app.core.exceptions import IncorrectCredentialsException
from app.core.security.pwd import get_password_hash, verify_password
from app.models.person import Person
from app.models.user import (
    Permission,
    RolePermission,
    UserPermission,
    User
)
from app.schemas.user.permission import PermissionInUser
from app.schemas.user.user import UserCreate, UserUpdate
from app.services import BaseService


class UserService(BaseService[User, UserCreate, UserUpdate]):
    '''Service that provides CRUD operations and authentication
    for a user model.

    Args:
        BaseService ([User, UserCreate, UserUpdate]): Models and schemas.
    '''

    @classmethod
    def get_service(cls, db: Session):  # pylint: disable=missing-function-docstring, invalid-name  # noqa: E501
        return cls(model=User, db=db)

    def get_by_username(self, username: str) -> User | None:
        '''Retrieve a user by username.

        Args:
            username (str): User identifier name.

        Returns:
            User | None: A user if exists, None otherwise.
        '''
        return (self.db  # pyright: ignore
                .query(User)
                .options(lazyload(User.person), lazyload(User.role))
                .filter(User.username == username)  # type: ignore
                .first())

    def get_by_email(self, email: str) -> User | None:
        '''Retrieve a user by email.

        Args:
            username (str): Email identifier name.

        Returns:
            User | None: A user if exists, None otherwise.
        '''
        return (self.db  # pyright: ignore
                .query(User)
                .join(Person, Person.dni == User.dni)  # type: ignore
                .filter(Person.email == email)  # type: ignore
                .first())

    def create(self, obj_in: UserCreate) -> User:
        '''Create a new user by encrypting password.

        Args:
            obj_in (UserCreate): User data to be recorded.

        Returns:
            User: User data recorded.
        '''
        db_obj = User(  # pyright: ignore
            dni=obj_in.dni,
            hashed_password=get_password_hash(obj_in.password),
            role_id=obj_in.role_id
        )

        self.db.add(db_obj)  # type: ignore
        self.db.commit()
        self.db.refresh(db_obj)  # type: ignore

        return db_obj

    def update(
        self, *, db_obj: User, obj_in: UserUpdate | dict[str, Any]
    ) -> User:
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
            obj_in
            if isinstance(obj_in, dict) else
            obj_in.dict(exclude_unset=True)
        )

        if update_data['password']:
            hashed_password = get_password_hash(update_data['password'])
            del update_data['password']
            update_data['hashed_password'] = hashed_password

        return super().update(db_obj=db_obj, obj_in=update_data)

    def authenticate(self, *, username: str, password: str) -> User | None:
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
        query = self.db.query(User).filter(User.dni == user_id)
        return (self.db
                .query(query.exists())
                .scalar())

    def contains_by_username(self, username: str) -> bool:
        '''Checks if the user model contains the given username.

        Args:
            username (str): The username of the user to check for.

        Returns:
            bool: True if the user exists, False otherwise.
        '''
        query = self.db.query(User).filter(User.username == username)
        return (self.db
                .query(query.exists())
                .scalar())

    def update_password(self, *, db_user: User, new_password: str):
        '''Update an user's password.

        Args:
            db_user (User): User recorded.
            new_password (str): New user's password.
        '''
        user_in = UserUpdate(**db_user._asdict())  # pyright: ignore
        user_in.password = new_password

        self.update(
            db_obj=db_user,
            obj_in=user_in
        )

    def send_new_account_email(self, *, user: User):
        '''Send a new account email to the given user.
        This is if the system supports it.

        Args:
            user (User): User to send the email to.
        '''
        if settings.email.emails_enabled:
            send_new_account_email(
                email_to=user.person.email,
                username=user.username,
                password=user.password
            )

    def get(self, id: int) -> User | None:  # pylint: disable=C0103, C0116, W0622  # noqa: E501
        if (user := super().get(id)):
            user.permissions = self.get_permissions_for_user(user=user)

        return user

    def get_permissions_for_user(
        self, *, user: User
    ) -> list[PermissionInUser]:
        '''List of permissions of a user and its role.

        Args:
            user (User): User to retrieve permissions for.

        Returns:
            list[PermissionInUser]: List of permissions.
        '''
        role_subquery = self.__get_permissions_from(
            RolePermission,
            with_id=user.role.id
        )

        user_subquery = self.__get_permissions_from(
            UserPermission,
            with_id=user.dni
        )

        permissions_subquery = (
            role_subquery
            .union(user_subquery)
            .alias('permissions')
        )

        actions_agg = array_agg(
            permissions_subquery.c.action
        ).label('actions')

        return self.db.execute(
            select(permissions_subquery.c.name, actions_agg)
            .distinct()
            .group_by(permissions_subquery.c.name)
        ).all()

    def __get_permissions_from(
        self,
        model: RolePermission | UserPermission,
        *,
        with_id: int | UUID
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
                Permission,
                model.permission_id == Permission.id,
                isouter=True
            )
            .filter(
                model.role_id == with_id
                if model.__name__ == 'RolePermission' else
                model.user_id == with_id
            )
            .filter(model.is_active == true())
        )

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[User]:  # pylint: disable=C0116  # noqa: E501
        return (self.db
                .query(User)
                .filter(User.is_active == true())
                .order_by(asc(User.username))
                .order_by(asc(User.created_at))
                .slice(skip, limit)
                .all())
