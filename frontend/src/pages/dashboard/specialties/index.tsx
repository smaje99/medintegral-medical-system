import type { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';
import { useMemo } from 'react';

import { ProtectedLayout } from '@Components/layouts';
import { TableProvider } from '@Components/Table/Table';
import { Bar, Table } from '@Modules/Dashboard/Specialty';
import { getAllOfSpecialty } from '@Services/specialty.service'
import type { Data } from '@Types/data-request';
import type { Specialty } from '@Types/medical/specialty.model';

type Props = {
    readonly data: {
        specialties: Data<Specialty[]>;
    }
}

const SpecialtyPage: NextPage<Props> = ({ data }) => {
    const specialties = useMemo<Data<Specialty[]>>(() => (
        data.specialties
    ), [data.specialties]);

    return (
        <main>
            <TableProvider<Specialty> data={specialties}>
                <Bar />
                <Table />
            </TableProvider>
        </main>
    )
}

// @ts-ignore: next-line
SpecialtyPage.getLayout = (page: JSX.Element) => (
    <ProtectedLayout title="Especialidades">
        {page}
    </ProtectedLayout>
)

export default SpecialtyPage;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const token = await getToken({ req: context.req });

    const specialties: Props['data']['specialties'] = {};

    try {
        specialties.data = await getAllOfSpecialty(token.accessToken);
    } catch (error) {
        specialties.error = error;
    }

    return { props: { data: { specialties } } };
}