from typing import Any

from fastapi import APIRouter, Depends

from app.api.dependencies.auth import get_current_active_user
from app.models.user import User as UserModel
from app.schemas.user.user import User


router = APIRouter()


@router.get('/me', response_model=User)
def read_user_me(
    current_user: UserModel = Depends(get_current_active_user)
) -> Any:
    '''Retrieve the current user.

    Args:
    * current_user (UserModel): Get the current user

    Returns:
    * User: Current user.
    '''
    return current_user
