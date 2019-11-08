import React, { useState } from 'react';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import TabPosts from './TabPosts';
import TabMyPosts from './TabMyPosts';
// import { createTimeAgo } from '../utils/creators';

// eslint-disable-next-line no-unused-vars


const Feed = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = React.useCallback((tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  }, [activeTab]);

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            All posts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            My posts
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <TabPosts />
        </TabPane>
        <TabPane tabId="2">
          <TabMyPosts />
        </TabPane>
      </TabContent>

    </div>
  );
};

export default Feed;
