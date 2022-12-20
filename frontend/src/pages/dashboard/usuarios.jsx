import { ProtectedLayout } from '@Components/layouts';
import { styles, Bar } from '@Modules/Dashboard/Users';
import { getAllOfRoles } from '@Services/role.service'

const Users = ({ data }) => {
    return (
        <main className={styles.main}>
            <Bar data={data} />
        </main>
    )
}

Users.getLayout = (page) => (
    <ProtectedLayout title="Usuarios">
        {page}
    </ProtectedLayout>
)

export default Users;

export async function getServerSideProps(context) {
    const roles = { data: null, error: null };
    try {
        roles.data = await getAllOfRoles();
    } catch (error) {
        roles.error = error;
    }

    return { props: { data: { roles } } }
}