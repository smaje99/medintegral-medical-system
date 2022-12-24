import type { Person } from '@Types/person';
import type { Role } from "@Types/user/role";

export interface DataProps {
    data: {
        roles: { data: Role[]; error: Error; };
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
    'A+' = 'A+',
    'A-' = 'A-',
    'B+' = 'B+',
    'B-' = 'B-',
    'AB+' = 'AB+',
    'AB-' = 'AB-',
    'O+' = 'O+',
    'O-' = 'O-',
}

export interface UserCreateFormValues extends Omit<
    Person,
    'blood_type'
    | 'rh_factor'
    | 'occupation'
    | 'created_at'
    | 'modified_at'
> {
    readonly blood_type?: BloodTypeWithRHFactor;
    readonly role_id: Role['id'];
}