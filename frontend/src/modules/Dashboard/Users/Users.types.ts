import { Data } from '@Types/data-request';
import type { Person } from '@Types/person';
import type { Role } from '@Types/user/role';
import { User } from '@Types/user/user';

export interface DataProps {
    data: {
        roles: Data<Role[]>;
        users: Data<User[]>;
    };
}

export interface CreateFormModalProps {
    isOpen: boolean;
    close: () => void;
    data: DataProps['data'];
}

export interface CreateFormViewProps {
    isPersonLoading: boolean;
    isPersonCreated: boolean;
    handleCreate: (formData: UserCreateFormValues) => Promise<void>;
    handleClose: () => void;
    searchPerson: () => Promise<void>;
    roles: DataProps['data']['roles']
}

export enum BloodTypeWithRHFactor {
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
}

export interface UserCreateFormValues extends Omit<
    Person,
    'bloodType'
    | 'rhFactor'
    | 'occupation'
    | 'createdAt'
    | 'modifiedAt'
> {
    readonly bloodType?: BloodTypeWithRHFactor;
    readonly roleId: Role['id'];
}