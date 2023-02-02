import { HiIdentification } from 'react-icons/hi2';

import { Tabs } from '@Components/Tabs'

import PersonalData from '../PersonalData';
import ProfileMainData from '../ProfileMainData';
import type { ProfileDataProps } from '../User.types';

const ProfileData = ({ user }: ProfileDataProps) => {
    return (
        <>
            <ProfileMainData user={user} />
            <Tabs
                tabs={(<>
                    <HiIdentification /> Información Personal
                </>)}
            >
                <PersonalData user={user} />
            </Tabs>
        </>
    )
}

export default ProfileData;