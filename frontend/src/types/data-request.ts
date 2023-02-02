export interface Data<T extends object = {}> {
    data?: T;
    error?: Error;
}