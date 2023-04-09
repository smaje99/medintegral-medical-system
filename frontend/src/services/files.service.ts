import api from '@Api/files.api';
import { FileModel, FileCreate } from '@Types/file.model';
import { Token } from '@Types/user/token';

import { withAxiosHandler } from './commons';

export const createFile: (
    file: FileCreate, token: Token['accessToken']
) => Promise<FileModel> = withAxiosHandler(
    async (file, token) => api.create(file, token)
);