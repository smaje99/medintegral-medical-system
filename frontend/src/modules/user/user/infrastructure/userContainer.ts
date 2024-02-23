import { UserCreate } from '../application';
import { UserRepository } from '../domain';
import { UserCreateController } from './controllers/userCreateController';
import { AxiosUserRepository } from './http/axiosUserRepository';

const repository: UserRepository = new AxiosUserRepository();

const userCreate = new UserCreate(repository);

export const userCreateController = new UserCreateController(userCreate);
