import type { Data } from '@Types/data-request';
import { Person, PersonUpdate } from '@Types/person';
import type { Role } from '@Types/user/role';
import type { User, UserPasswordUpdate, UserUpdate } from '@Types/user/user';

export interface DataProps {
    readonly data: {
        user: Data<User>;
        roles: Data<Role[]>;
    }
}

export interface ProfileProps {
    readonly user: DataProps['data']['user'];
    readonly roles: DataProps['data']['roles'];
}

export interface ProfileDataProps extends ProfileProps { }

export interface ProfileMainDataProps extends ProfileProps { }

export interface PersonalDataProps extends Pick<ProfileProps, 'user'> { }

export interface UserUpdateFormProps extends Pick<ProfileProps, 'roles'> {
    readonly userDni: User['dni']
    readonly setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserUpdateValues extends UserUpdate { }

export type UserUpdateModalProps = {
    isOpen: boolean;
    close: () => void;
    isUserOwner: boolean;
    personalData: Person;
}

export type PersonalDataUpdateProps = {
    onUpdate: (data: PersonalDataUpdateValues) => Promise<void>;
    onClose: () => void;
};

export type ChangePasswordProps = {
    onUpdate: (data: ChangePasswordValues) => Promise<void>;
    onClose: () => void;
};

export interface PersonalDataUpdateValues extends Omit<PersonUpdate, 'bloodType' | 'rhFactor'> {
    readonly bloodType?: string;
}

export type ChangePasswordValues = UserPasswordUpdate;