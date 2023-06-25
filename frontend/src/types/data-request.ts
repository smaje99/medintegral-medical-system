export interface Data<T extends object = object> {
  data?: T;
  error?: Error;
}
