import { Data } from '@Types/data-request';
import { User } from '@Types/user/user';

export interface DataProps {
    data: {
        user: Data<User>;
    }
}

export interface ProfileProps {
    user: DataProps['data']['user'];
}

export interface ProfileDataProps extends ProfileProps { }

export interface ProfileMainDataProps extends ProfileProps { }

export interface PersonalDataProps extends ProfileProps { }