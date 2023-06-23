import * as api from '@/api/files.api';
import { FileCreate, FileModel } from '@/types/file.model';
import { Token } from '@/types/user/token';

import { withAxiosHandler } from './commons';

export const createFile: (
  file: FileCreate,
  token: Token['accessToken']
) => Promise<FileModel> = withAxiosHandler(async (file, token) =>
  api.create(file, token)
);
