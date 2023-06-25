import { useId } from 'react';
import { Tab, TabList, TabPanel, Tabs as TabsContainer } from 'react-tabs';

import styles from './Tabs.module.scss';

interface Props {
  tabs: React.ReactNode | React.ReactNode[];
  theme?: 'dark' | 'light';
  children: React.ReactNode | React.ReactNode[];
}

const Tabs: React.FC<Props> = ({ tabs, theme = 'light', children }) => {
  const tabsId = useId();
  const panelsId = useId();

  return (
    <TabsContainer>
      <TabList className={['react-tabs__tab-list', styles.list]}>
        {Array.isArray(tabs) ? (
          tabs
            .filter((tab) => !!tab)
            .map((tab, idx) => (
              <Tab
                key={`${tabsId}-${tab.toString()}-${idx}`}
                className={['react-tabs__tab', styles.tab, styles[theme]]}
                selectedClassName={`react-tabs__tab--selected ${styles['tab--selected']}`}
              >
                {tab}
              </Tab>
            ))
        ) : (
          <Tab
            className={['react-tabs__tab', styles.tab]}
            selectedClassName={`react-tabs__tab--selected ${styles['tab--selected']}`}
          >
            {tabs}
          </Tab>
        )}
      </TabList>

      {Array.isArray(children) ? (
        children
          .filter((child) => !!child)
          .map((child, idx) => (
            <TabPanel key={`${panelsId}-${child.toString()}-${idx}`}>{child}</TabPanel>
          ))
      ) : (
        <TabPanel>{children}</TabPanel>
      )}
    </TabsContainer>
  );
};

export default Tabs;
