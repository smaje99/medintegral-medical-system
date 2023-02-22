from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query
from starlette.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)

from app.api.dependencies.auth import (
    get_current_active_user,
    get_current_user_with_permissions,
)
from app.api.dependencies.person import get_person_if_no_user_exists
from app.api.dependencies.services import ServiceDependency
from app.core.exceptions import IncorrectCredentialsException
from app.core.types import PermissionAction
from app.models.user import User as UserModel
from app.schemas.person.person import Person
from app.schemas.user.user import (
    User,
    UserCreate,
    UserUpdate,
    UserUpdatePassword,
    UserInSession,
)
from app.services.user import UserService, RoleService


router = APIRouter()


@router.get('/me')
def read_user_me(
    current_user: UserModel = Depends(get_current_active_user),
) -> UserInSession:
    '''Retrieve the current user.

    Returns:
    * User: Current user.
    '''
    return current_user  # type: ignore


@router.get('/search')
def search_user_by_dni(
    dni: int = Query(...),
    current_user: UserModel = Depends(  # pylint: disable=W0613
        get_current_user_with_permissions('usuarios', {PermissionAction.read})
    ),
    service: UserService = Depends(ServiceDependency(UserService)),
) -> list[User]:
    '''Search for users by a given DNI.

    Args:
    * dni (str): DNI given to retrieve the users matching this one.

    Returns:
    * list[User]: List of users who start their DNI with the given.
    '''
    return service.search_by_dni(dni)  # type: ignore


@router.post('/', status_code=HTTP_201_CREATED)
def create_user(
    current_user: UserModel = Depends(  # pylint: disable=W0613
        get_current_user_with_permissions('usuarios', {PermissionAction.creation})
    ),
    person: Person = Depends(get_person_if_no_user_exists),
    role_id: UUID = Body(..., alias='roleId'),
    role_service: RoleService = Depends(ServiceDependency(RoleService)),
    user_service: UserService = Depends(ServiceDependency(UserService)),
) -> User:
    '''Create an user and notify the user's email address.

    Args:
    * dni (int): Identification number of the person to create an user.
    * roleId (UUID): Role ID to be assigned to the user.

    Raises:
    * HTTPException: HTTP 400. Person doesn't exist.
    * HTTPException: HTTP 400. User already exists.

    Returns:
    * User: User with personal data.
    '''
    if not role_service.contains(role_id):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='El rol a asignar al usuario no existe',
        )

    password = str(person.dni)
    user_in = UserCreate(dni=person.dni, password=password, role_id=role_id)

    user = user_service.create(user_in)
    user_service.send_new_account_email(user=user, password=password)

    return user  # type: ignore


@router.get('/{dni}')
def read_user(
    dni: int = Path(...),
    current_user: User = Depends(
        get_current_user_with_permissions('usuarios', {PermissionAction.read})
    ),
    user_service: UserService = Depends(ServiceDependency(UserService)),
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


@router.get('/')
def read_users(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50),
    current_user: UserModel = Depends(  # pylint: disable=W0613
        get_current_user_with_permissions('usuarios', {PermissionAction.read})
    ),
    service: UserService = Depends(ServiceDependency(UserService)),
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
    dni: int = Path(..., gt=0),
    user_in: UserUpdate = Body(...),
    current_user: UserModel = Depends(
        get_current_user_with_permissions('usuarios', {PermissionAction.update})
    ),
    role_service: RoleService = Depends(ServiceDependency(RoleService)),
    user_service: UserService = Depends(ServiceDependency(UserService)),
) -> User:
    '''Update a user's data with a given DNI.

    Args:
    * dni: DNI given to retrieve the user to be updated via a path parameter.
    * user_in(UserUpdate): User's data to update via body parameter.

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
            status_code=HTTP_401_UNAUTHORIZED,
            detail='No tienes permiso de modificar a un superusuario',
        )

    if user_in.role_id:
        if current_user.dni == dni:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED,
                detail='El usuario propietario no puede actualizar su rol',
            )

        if not role_service.contains(user_in.role_id):
            raise HTTPException(
                status_code=HTTP_400_BAD_REQUEST,
                detail='El rol a asignar al usuario no existe',
            )

    return user_service.update(db_obj=user, obj_in=user_in)  # type: ignore


@router.patch('/password')
def update_password(
    user_in: UserUpdatePassword = Body(...),
    current_user: UserModel = Depends(get_current_active_user),
    service: UserService = Depends(ServiceDependency(UserService)),
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
            db_user=current_user, user_in=user_in
        )
    except (ValueError, IncorrectCredentialsException) as error:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST, detail=str(error)
        ) from error
