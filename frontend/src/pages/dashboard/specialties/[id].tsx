import type { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';

import { ProtectedLayout } from '@Components/layouts';
import { getSpecialty } from '@Services/specialty.service';
import type { Data } from '@Types/data-request';
import type { Specialty } from '@Types/medical/specialty.model';
import { Detailed } from '@Modules/Dashboard/Specialty';

interface DataProps {
    readonly data: {
        specialty: Data<Specialty>;
    }
}

const SpecialtyPage: NextPage<DataProps> = ({ data }) => {
    return (
        <main>
            <Detailed specialty={data.specialty} />
        </main>
    )
}

// @ts-ignore: next-line
SpecialtyPage.getLayout = (page: JSX.Element) => (
    <ProtectedLayout title='Especialidad'>
        {page}
    </ProtectedLayout>
)

export default SpecialtyPage;

export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
    const token = await getToken({ req: context.req });
    const { id  } = context.query;

    const specialty: Data<Specialty> = {};

    try {
        specialty.data = await getSpecialty(
            id as string, token.accessToken
        );
    } catch (error) {
        specialty.error = error;
    }

    return { props: { data: { specialty } } };
}