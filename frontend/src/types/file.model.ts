export interface FileModel {
    pathname: string;
    type: string;
}

export interface FileCreate {
    file: File;
    directory: 'system';
}