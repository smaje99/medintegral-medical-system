import {
    AboutUs,
    Layout,
    Maps
} from '@Modules/home';

const Home = () => (
    <>
        <AboutUs />
        <Maps />
    </>
)

Home.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default Home;