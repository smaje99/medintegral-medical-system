import os
from uuid import uuid4

import aiofiles
from fastapi import UploadFile

from app.core.types import Directory
from app.schemas.common.file import File


class FileService:
    '''Service that provides operations for the files.'''

    async def store(self, in_file: UploadFile, directory: Directory) -> File:
        '''Store a file in a given directory,
        replacing the filename with a generated uuid.

        Args:
            in_file (UploadFile): File to store.
            directory (Directory): Directory to store the file.

        Returns:
            File: Metadata of the stored file.
        '''
        filename = self._generate_filename(in_file.filename or '')
        path = f'files/{directory}/{filename}'

        async with aiofiles.open(path, 'wb+') as out_file:
            content = await in_file.read()
            await out_file.write(content)

        return File(pathname=path[6:], type=in_file.content_type or 'file')

    def _generate_filename(self, filename: str) -> str:
        '''Generate a filename based on a UUIDv4.

        Args:
            filename (str): Filename with extension.

        Returns:
            str: New filename with extension.
        '''
        extension = os.path.splitext(filename)[1]
        return f'{uuid4()}{extension}'
