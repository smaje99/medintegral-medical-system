import { GetServerSideProps } from 'next';

import { AboutUs, Layout, Maps, TellUs } from '@/modules/Home';
import { getAllOfPinnedSuggestions } from '@/services/suggestion.service';
import type { NextPageWithLayout } from '@/types/next';
import type { Suggestion } from '@/types/suggestion';

type DataProps = {
  data: {
    suggestions: Suggestion[];
  };
};

const Home: NextPageWithLayout<DataProps> = ({ data }) => (
  <>
    <AboutUs />
    <Maps />
    <TellUs suggestions={data.suggestions} />
  </>
);

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  let suggestions: Suggestion[] = [];
  try {
    suggestions = await getAllOfPinnedSuggestions();
  } catch (error) {
    suggestions = [];
  }

  return { props: { data: { suggestions } } };
};
