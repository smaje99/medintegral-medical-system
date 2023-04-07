import api from '@Api/person.api';
import type { Person, PersonCreate, PersonUpdate } from '@Types/person';
import { Token } from '@Types/user/token';

import { withAxiosHandler } from './commons';

export const getPerson: (dni: Person['dni']) => Promise<Person> = withAxiosHandler(
    (dni) => api.get(dni)
);

export const createPerson: (
    personObj: PersonCreate
) => Promise<Person> = withAxiosHandler(
    (personObj) => api.create(personObj)
);

export const updatePerson: (
    dni: Person['dni'], person: PersonUpdate, token: Token['accessToken']
) => Promise<Person> = withAxiosHandler(
    (dni, person, token) => api.update(dni, person, token)
);