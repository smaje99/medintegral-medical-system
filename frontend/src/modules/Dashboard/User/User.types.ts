import { NextRouter } from 'next/router';

import type { Data } from '@Types/data-request';
import type { DoctorUpdate } from '@Types/doctor.model';
import type { Person, PersonUpdate } from '@Types/person';
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
    readonly router: NextRouter;
}

export interface ProfileDataProps extends Omit<ProfileProps, 'router'> { }

export interface ProfileMainDataProps extends Omit<ProfileProps, 'router'> { }

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
    doctorData: User['doctor'];
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

export type UserDisableModalProps = {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export type DoctorDataProps = Required<Pick<User, 'doctor'>>;

export type DoctorDataTable = User['doctor'];

export type DoctorDataFormProps = {
    onUpdate: (data: DoctorDataUpdateValues) => Promise<void>;
    onClose: () => void;
    medicalLicenses: string[];
    handleAddMedicalLicense: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleRemoveMedicalLicense: (item: string) => void;
};

export type DoctorDataUpdateValues = DoctorUpdate;