export interface Person {
    readonly dni: number,
    readonly name: string;
    readonly surname: string;
    readonly address?: string;
    readonly email: string;
    readonly phone: string;
    readonly gender: 'masculino' | 'femenino';
    readonly age?: string;
    readonly birthdate: Date;
    readonly documentType: 'R.C.' | 'T.I.' | 'C.C.' | 'C.E.';
    readonly bloodType?: 'A' | 'B' | 'AB' | 'O';
    readonly rhFactor?: '+' | '-';
    readonly ethnicity?: string;
    readonly occupation?: string;
    readonly civilStatus?: 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'unión marital';
    readonly createdAt: Date;
    readonly modifiedAt: Date;
}

export type PersonInUserSession = Pick<
    Person,
    'dni'
    | 'name'
    | 'surname'
    | 'email'
    | 'phone'
    | 'gender'
    | 'createdAt'
    | 'modifiedAt'
>

export type PersonCreate = Omit<Person, 'createdAt' | 'modifiedAt' | 'age'>

export type PersonUpdate = Omit<Partial<Person>, 'createdAt' | 'modifiedAt' | 'age'>;