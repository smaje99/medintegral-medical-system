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
    readonly document_type: 'R.C.' | 'T.I.' | 'C.C.' | 'C.E.';
    readonly blood_type?: 'A' | 'B' | 'AB' | 'O';
    readonly rh_factor?: '+' | '-';
    readonly ethnicity?: string;
    readonly occupation?: string;
    readonly civil_status?: 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'unión marital';
    readonly created_at: Date;
    readonly modified_at: Date;
}

export type PersonInUserSession = Pick<
    Person,
    'dni'
    | 'name'
    | 'surname'
    | 'email'
    | 'phone'
    | 'gender'
    | 'created_at'
    | 'modified_at'
>

export type PersonCreate = Omit<Person, 'created_at' | 'modified_at' | 'age'>