import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

import { ProtectedLayout } from '@/components/layouts';
import { Detailed } from '@/modules/Dashboard/Specialty';
import { getSpecialty } from '@/services/specialty.service';
import type { Data } from '@/types/data-request';
import type { Specialty } from '@/types/medical/specialty.model';
import { NextPageWithLayout } from '@/types/next';

type DataProps = {
  readonly data: {
    specialty: Data<Specialty>;
  };
};

const SpecialtyPage: NextPageWithLayout<DataProps> = ({ data }) => {
  return (
    <main>
      <Detailed specialty={data.specialty} />
    </main>
  );
};

SpecialtyPage.getLayout = (page) => (
  <ProtectedLayout title='Especialidad'>{page}</ProtectedLayout>
);

export default SpecialtyPage;

export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
  const token = await getToken({ req: context.req });
  const { id } = context.query;

  const specialty: Data<Specialty> = {};

  try {
    specialty.data = await getSpecialty(id as string, token.accessToken);
  } catch (error) {
    specialty.error = error;
  }

  return { props: { data: { specialty } } };
};
