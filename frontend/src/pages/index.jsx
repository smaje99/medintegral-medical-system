import { HomeLayout } from '@Components/layouts';

const Home = () => {
    return (
        <>
            <h1>Hola Medintegral IPS SAS</h1>
        </>
    )
}

Home.getLayout = (page) => (
    <HomeLayout>
        {page}
    </HomeLayout>
)

export default Home;