from typing import Any

from sqlalchemy.orm import Session
from sqlalchemy.sql import exists

from app.core.config import settings
from app.core.email import send_new_account_email
from app.core.exceptions import IncorrectCredentialsException
from app.core.security.pwd import get_password_hash, verify_password
from app.models.person import Person
from app.models.user import User
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
            hashed_password=get_password_hash(obj_in.password)
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

    def contains_by_username(self, username: str) -> bool:
        '''Checks if the user model contains the given username.

        Args:
            username (str): The username of the user to check for.

        Returns:
            bool: True if the user exists, False otherwise.
        '''
        return (self.db
                .query(exists().where(User.username == username))  # type: ignore  # noqa: E501
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
