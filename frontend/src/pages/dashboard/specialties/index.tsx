import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useMemo } from 'react';

import { ProtectedLayout } from '@/components/layouts';
import { TableProvider } from '@/components/Table/Table';
import useModal from '@/hooks/useModal';
import { Bar, CreateFormModal, Table } from '@/modules/Dashboard/Specialties';
import { getAllOfSpecialty } from '@/services/specialty.service';
import type { Data } from '@/types/data-request';
import type { Specialty } from '@/types/medical/specialty.model';
import type { NextPageWithLayout } from '@/types/next';

type Props = {
  readonly data: {
    specialties: Data<Specialty[]>;
  };
};

const SpecialtiesPage: NextPageWithLayout<Props> = ({ data }) => {
  const [isCreateModal, openCreateModal, closeCreateModal] = useModal();

  const specialties = useMemo<Data<Specialty[]>>(
    () => data.specialties,
    [data.specialties]
  );

  return (
    <main>
      <TableProvider<Specialty> data={specialties}>
        <Bar {...{ openCreateModal }} />
        <Table />
      </TableProvider>

      <CreateFormModal isOpen={isCreateModal} onClose={closeCreateModal} />
    </main>
  );
};

SpecialtiesPage.getLayout = (page) => (
  <ProtectedLayout title='Especialidades'>{page}</ProtectedLayout>
);

export default SpecialtiesPage;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const token = await getToken({ req: context.req });

  const specialties: Props['data']['specialties'] = {};

  try {
    specialties.data = await getAllOfSpecialty(token.accessToken);
  } catch (error) {
    specialties.error = error;
  }

  return { props: { data: { specialties } } };
};
