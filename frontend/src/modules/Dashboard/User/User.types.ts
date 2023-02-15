import type { Data } from '@Types/data-request';
import type { Role } from '@Types/user/role';
import type { User, UserUpdate } from '@Types/user/user';

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

export interface UserPersonalDataUpdateFormValues extends Omit<User['person'], 'age'> { }

export interface UserUpdateValues extends UserUpdate { }