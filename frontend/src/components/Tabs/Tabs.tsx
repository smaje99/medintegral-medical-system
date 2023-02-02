import {
    Tab,
    Tabs as TabsContainer,
    TabList,
    TabPanel
} from 'react-tabs';

import { TabsProps } from './Tabs.types';

import styles from './Tabs.module.scss';

const Tabs = ({ tabs, children }: TabsProps) => {
    return (
        <TabsContainer>
            <TabList className={['react-tabs__tab-list', styles["list"]]}>
                {Array.isArray(tabs) ? tabs.map(tab => (
                    <Tab
                        key={tab.toString()}
                        className={['react-tabs__tab', styles["tab"]]}
                        selectedClassName={`react-tabs__tab--selected ${styles["tab--selected"]}`}
                    >
                        {tab}
                    </Tab>
                )) : (
                    <Tab
                        className={['react-tabs__tab', styles["tab"]]}
                        selectedClassName={`react-tabs__tab--selected ${styles["tab--selected"]}`}
                    >
                        {tabs}
                    </Tab>
                )}
            </TabList>

            {Array.isArray(children) ? children.map(child => (
                <TabPanel key={child.toString()}>
                    {child}
                </TabPanel>
            )) : (
                <TabPanel>
                    {children}
                </TabPanel>
            )}
        </TabsContainer>
    )
}

export default Tabs;