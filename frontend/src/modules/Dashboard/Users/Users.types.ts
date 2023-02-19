import { Data } from '@Types/data-request';
import { PersonCreate } from '@Types/person';
import type { Role } from '@Types/user/role';
import { User } from '@Types/user/user';

export interface DataProps {
    data: {
        roles: Data<Role[]>;
        users: Data<User[]>;
    };
}

export type BarProps = {
    openCreateModal: () => void;
}

export interface CreateFormModalProps {
    isOpen: boolean;
    close: () => void;
    roles: DataProps['data']['roles'];
}

export interface CreateFormViewProps {
    isPersonLoading: boolean;
    isPersonCreated: boolean;
    handleCreate: (formData: UserCreateFormValues) => Promise<void>;
    handleClose: () => void;
    searchPerson: () => Promise<void>;
    roles: DataProps['data']['roles']
}

export interface UserCreateFormValues extends Omit<
    PersonCreate,
    'bloodType'
    | 'rhFactor'
    | 'occupation'
> {
    readonly bloodType?: string;
    readonly roleId: Role['id'];
}