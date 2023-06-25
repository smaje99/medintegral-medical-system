import { HiIdentification } from 'react-icons/hi2';
import { MdHealthAndSafety } from 'react-icons/md';

import { Tabs } from '@/components/Tabs';
import type { Data } from '@/types/data-request';
import type { Role } from '@/types/user/role';
import type { User } from '@/types/user/user';

import DoctorData from '../DoctorData';
import PersonalData from '../PersonalData';
import ProfileMainData from '../ProfileMainData';

type Props = {
  readonly user: Data<User>;
  readonly roles: Data<Role[]>;
};

const ProfileData: React.FC<Props> = ({ user, roles }) => {
  return (
    <>
      <ProfileMainData user={user} roles={roles} />
      <Tabs
        tabs={[
          <>
            {' '}
            <HiIdentification /> Información Personal{' '}
          </>,
          user?.data?.doctor ? (
            <>
              {' '}
              <MdHealthAndSafety /> Datos médicos{' '}
            </>
          ) : null,
        ]}
      >
        <PersonalData user={user} />
        {user?.data?.doctor ? <DoctorData doctor={user.data.doctor} /> : null}
      </Tabs>
    </>
  );
};

export default ProfileData;
