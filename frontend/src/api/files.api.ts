import axios from 'axios';

import type { Token } from '@Types/user/token';
import type { FileModel, FileCreate } from '@Types/file.model';

import { baseURL, headers } from './commons';

export default {
    /**
     * Create a new file in the API service.
     * @param specialty (FileCreate)
     * @param token (Token['accessToken'])
     * @returns a Promise that resolves to a FileModel.
     */
    async create({ directory, file }: FileCreate, token: Token['accessToken']) {
        const formData = new FormData();
        formData.append('file', file, file.name);

        const { headers: { Authorization } } = headers(token);

        return axios.post<FileModel>(`/files/${directory}`, formData, {
            baseURL,
            headers: {
                Authorization,
                'Content-Type':
                    'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        });
    }
}