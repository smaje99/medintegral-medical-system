import { User } from './user';

export type UserPostResponse = Pick<
  User,
  'id' | 'fullname' | 'username' | 'email' | 'image' | 'role'
>;
