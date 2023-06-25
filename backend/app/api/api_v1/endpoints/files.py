from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, Path, Security, UploadFile
from starlette.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from app.api.dependencies.auth import get_current_active_user
from app.core.types import Directory
from app.schemas.common.file import File as FileSchema
from app.services.file import FileService


router = APIRouter()

Service = Annotated[FileService, Depends(FileService)]

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


@router.post(
    '/{directory}',
    status_code=HTTP_201_CREATED,
    dependencies=[Security(get_current_active_user)],
)
async def store_file(
    directory: Annotated[Directory, Path()],
    file: Annotated[UploadFile, File(...)],
    service: Service,
) -> FileSchema:
    '''Store a file sent by a user.

    Args:
    * directory (Directory): Directory to store the file.
    * file (UploadFile): File to store.

    Raises:
    * HTTPException: HTTP 400. The file must be a maximum of 5MB in size.

    Returns:
    * FileSchema: File metadata.
    '''
    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='El archivo excede el tamaño máximo permitido de 5MB',
        )

    return await service.store(file, directory)
