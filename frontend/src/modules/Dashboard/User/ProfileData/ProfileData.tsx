import { HiIdentification } from 'react-icons/hi2';
import { MdHealthAndSafety } from 'react-icons/md';

import { Tabs } from '@Components/Tabs'

import DoctorData from '../DoctorData';
import PersonalData from '../PersonalData';
import ProfileMainData from '../ProfileMainData';
import type { ProfileDataProps } from '../User.types';

const ProfileData = ({ user, roles }: ProfileDataProps) => {
    return (
        <>
            <ProfileMainData user={user} roles={roles} />
            <Tabs
                tabs={[
                    (<> <HiIdentification /> Información Personal </>),
                    user?.data?.doctor ? (<> <MdHealthAndSafety /> Datos médicos </>) : null
                ]}
            >
                <PersonalData user={user} />
                {user?.data?.doctor ? <DoctorData doctor={user.data.doctor} /> : null}
            </Tabs>
        </>
    )
}

export default ProfileData;