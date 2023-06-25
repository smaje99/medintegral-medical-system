from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query, Security
from pydantic import SecretStr
from starlette.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
)

from app.api.dependencies.auth import CurrentActiveUser, CurrentUserWithPermissions
from app.api.dependencies.person import PersonIfNoUserExistsDependency
from app.api.dependencies.services import ServiceDependency
from app.core.exceptions import IncorrectCredentialsException
from app.core.security.pwd import generate_password
from app.core.types import Action, Permission
from app.schemas.user.user import (
    User,
    UserCreate,
    UserUpdate,
    UserUpdatePassword,
    UserInSession,
)
from app.services.user import UserService, RoleService


router = APIRouter()

UserServiceDependency = Annotated[UserService, Depends(ServiceDependency(UserService))]

RoleServiceDependency = Annotated[RoleService, Depends(ServiceDependency(RoleService))]


@router.get('/me')
def read_user_me(current_user: CurrentActiveUser) -> UserInSession:
    '''Retrieve the current user.

    Returns:
    * User: Current user.
    '''
    return current_user  # type: ignore


@router.get(
    '/search',
    dependencies=[Security(CurrentUserWithPermissions(Permission.USERS, {Action.READ}))],
)
def search_user_by_dni(
    dni: Annotated[int, Query()], service: UserServiceDependency
) -> list[User]:
    '''Search for users by a given DNI.

    Args:
    * dni (str): DNI given to retrieve the users matching this one.

    Returns:
    * list[User]: List of users who start their DNI with the given.
    '''
    return service.search_by_dni(dni)  # type: ignore


@router.post(
    '/',
    status_code=HTTP_201_CREATED,
    dependencies=[
        Security(CurrentUserWithPermissions(Permission.USERS, {Action.CREATION}))
    ],
)
def create_user(
    role_id: Annotated[UUID, Body(alias='roleId')],
    role_service: RoleServiceDependency,
    user_service: UserServiceDependency,
    person: PersonIfNoUserExistsDependency,
) -> User:
    '''Create an user and notify the user's email address.

    Args:
    * dni (int): Identification number of the person to create an user.
    * roleId (UUID): Role ID to be assigned to the user.

    Raises:
    * HTTPException: HTTP 404. Person not found.
    * HTTPException: HTTP 400. User already exists.
    * HTTPException: HTTP 404. Role not found

    Returns:
    * User: User with personal data.
    '''
    if not role_service.contains(role_id):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='El rol a asignar al usuario no existe',
        )

    password = SecretStr(generate_password(person.dni))
    user_in = UserCreate(dni=person.dni, password=password, role_id=role_id)

    user = user_service.create(user_in)
    user_service.send_new_account_email(user=user, password=password)

    return user  # type: ignore


@router.get('/{dni}')
def read_user(
    dni: Annotated[int, Path()],
    current_user: Annotated[
        User, Security(CurrentUserWithPermissions(Permission.USERS, {Action.READ}))
    ],
    user_service: UserServiceDependency,
) -> User:
    '''Retrieve a user by a given DNI.
    If the given DNI doesn't exist, raise an error.

    Args:
    * dni (int): DNI given to retrieve the user via a path parameter.

    Raises:
    * HTTPException: HTTP error 404. User not found.

    Returns:
    * User: The user with the given DNI.
    '''
    if dni == current_user.dni:
        return current_user

    if not (user := user_service.get(dni)):
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail='El usuario no existe')

    return user  # type: ignore


@router.get(
    '/',
    dependencies=[Security(CurrentUserWithPermissions(Permission.USERS, {Action.READ}))],
)
def read_users(
    *,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query()] = 50,
    service: UserServiceDependency,
) -> list[User]:
    '''Retrieve a list of users.

    Args:
    * skip (int): Start cut of subset of users via query parameter. Defaults to 0.
    * limit (int): Number of users within the subset via query parameter. Defaults to 50.

    Returns:
    * list[Person]: Specified subset of users.
    '''
    return service.get_all(skip=skip, limit=limit)  # type: ignore


@router.put('/{dni}')
def update_user(
    dni: Annotated[int, Path(gt=0)],
    user_in: Annotated[UserUpdate, Body(alias='userIn')],
    current_user: Annotated[
        User, Security(CurrentUserWithPermissions(Permission.USERS, {Action.UPDATE}))
    ],
    role_service: RoleServiceDependency,
    user_service: UserServiceDependency,
) -> User:
    '''Update a user's data with a given DNI.

    Args:
    * dni: DNI given to retrieve the user to be updated via a path parameter.
    * user_in(UserUpdate): User's data to update via body parameter.

    Raises:
    * HTTPException: HTTP error 404. User not found.
    * HTTPException: HTTP error 403. Only the superuser can modify a superuser.
    * HTTPException: HTTP error 403. The owner user cannot update his role.
    * HTTPException: HTTP error 404. Role not found.

    Returns:
    * User: The user's data updated.
    '''
    if not (user := user_service.get(dni)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f'El usuario con la identificación {dni} no existe',
        )

    if user.is_superuser and not current_user.is_superuser:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail='No tienes permiso de modificar a un superusuario',
        )

    if user_in.role_id:
        if current_user.dni == dni:
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN,
                detail='El usuario propietario no puede actualizar su rol',
            )

        if not role_service.contains(user_in.role_id):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND,
                detail='El rol a asignar al usuario no existe',
            )

    return user_service.update(db_obj=user, obj_in=user_in)  # type: ignore


@router.patch('/password')
def update_password(
    user_in: Annotated[UserUpdatePassword, Body(alias='userIn')],
    current_user: CurrentActiveUser,
    service: UserServiceDependency,
) -> User:
    '''Update the current user's password.

    Args:
    * oldPassword(str): The old user's password via body parameter.
    * newPassword(str): The new user's password via body parameter.

    Returns:
    * User: The user's data updated.
    '''

    try:
        return service.update_password(  # type: ignore
            db_user=current_user, user_in=user_in  # type: ignore
        )
    except (ValueError, IncorrectCredentialsException) as error:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST, detail=str(error)
        ) from error


@router.patch('/disable/{dni}')
def disable_user(
    dni: Annotated[int, Path(ge=0)],
    disable: Annotated[bool, Body(embed=True)],
    current_user: Annotated[
        User, Security(CurrentUserWithPermissions(Permission.USERS, {Action.DISABLE}))
    ],
    service: UserServiceDependency,
) -> User:
    '''Change the user's status in the system.
    The user can be enabled or disabled.

    Args:
    * dni (int): DNI given to retrieve the user to be disabled via a path parameter.
    * disable (bool): New status to be assigned to the user via a body parameter

    Raises:
    * HTTPException: HTTP error 404. User not found.
    * HTTPException: HTTP error 403. User is a superuser.
    * HTTPException: HTTP error 403. Current user is not authorized.

    Returns:
    * User: User with updated status.
    '''
    if not (user := service.get(dni)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f'El usuario con la identificación {dni} no existe',
        )

    if user.is_superuser:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail='No tienes permiso de deshabilitar a un superusuario',
        )

    if current_user.dni == dni:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail='El usuario propietario no puede cambiar su estado en el sistema',
        )

    return service.disable(user, disable)  # type: ignore
