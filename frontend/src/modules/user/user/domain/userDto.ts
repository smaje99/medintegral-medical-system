import { UserAttributes } from './user';

export type UserPostResponse = Pick<
  UserAttributes,
  'id' | 'fullname' | 'username' | 'email' | 'image' | 'role'
>;
