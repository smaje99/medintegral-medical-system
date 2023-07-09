import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

import { ProtectedLayout } from '@/components/layouts';
import { Detailed } from '@/modules/Dashboard/Service';
import { getAllDoctors } from '@/services/doctor.service';
import { getService } from '@/services/service.service';
import type { Data } from '@/types/data-request';
import type { Doctor } from '@/types/medical/doctor.model';
import type { ServiceWithSpecialty } from '@/types/medical/service.model';
import type { NextPageWithLayout } from '@/types/next';

type DataProps = {
  readonly data: {
    readonly service: Data<ServiceWithSpecialty>;
    readonly doctors: Data<Doctor[]>;
  };
};

const ServicePage: NextPageWithLayout<DataProps> = ({ data }) => {
  return (
    <main>
      <Detailed service={data.service} doctors={data.doctors} />
    </main>
  );
};

ServicePage.getLayout = (page) => (
  <ProtectedLayout title='Servicio'>{page}</ProtectedLayout>
);

export default ServicePage;

export const getServerSideProps: GetServerSideProps<DataProps> = async ({
  req,
  query: { id },
}) => {
  const { accessToken: token } = await getToken({ req });

  const service: Data<ServiceWithSpecialty> = {};
  const doctors: Data<Doctor[]> = {};

  try {
    service.data = await getService(id as string, token);
  } catch (error) {
    service.error = error;
  }

  try {
    doctors.data = await getAllDoctors(token);
  } catch (error) {
    doctors.error = error;
  }

  return { props: { data: { service, doctors } } };
};
