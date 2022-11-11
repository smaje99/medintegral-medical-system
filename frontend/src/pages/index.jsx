import {
    AboutUs,
    Layout,
    Maps,
    TellUs
} from '@Modules/home';

const Home = () => (
    <>
        <AboutUs />
        <Maps />
        <TellUs />
    </>
)

Home.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default Home;