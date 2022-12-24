import { GetServerSideProps, NextPage } from 'next';

import {
    AboutUs,
    Layout,
    Maps,
    TellUs
} from '@Modules/home';
import type { DataProps } from '@Modules/Home/Home.types';
import { getAllOfPinnedSuggestions } from '@Services/suggestion.service';
import type { Suggestion } from '@Types/suggestion';

const Home: NextPage<DataProps> = ({ data }) => (
    <>
        <AboutUs />
        <Maps />
        <TellUs suggestions={data.suggestions} />
    </>
)

// @ts-ignore: next-line
Home.getLayout = (page: JSX.Element) => (
    <Layout>
        {page}
    </Layout>
)

export default Home;

export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
    let suggestions: Suggestion[] = [];
    try {
        suggestions = await getAllOfPinnedSuggestions();
    } catch (error) {
        suggestions = [];
    }

    return { props: { data: { suggestions } } };
}