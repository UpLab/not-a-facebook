import React, { useState, useMemo } from 'react';
import {
  Card, CardBody, CardText, CardTitle, Media,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Nav, NavItem, NavLink, TabContent, TabPane, ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import moment from 'moment';
import useMe from '../hooks/useMe';
import routes from '../router/routes';
// import { createTimeAgo } from '../utils/creators';

// eslint-disable-next-line no-unused-vars
const Post = ({
  body, creator: owner, handleRemovePost, createdAt,
}) => {
  const [me] = useMe();
  const { _id: ownerId, username } = owner;
  const { avatar, firstName, lastName } = owner.profile;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="post-form">
      <Card>
        <span className="d-flex mb-0">
          <CardBody className="pb-2 pl-2 pt-2">
            <span className="d-flex">
              <Media
                className="icon"
                src={avatar}
                alt="pic"
              />
              <Link to={`${routes.profile}/${username}`} className="text-dark mt-2 ml-2">
                {` ${firstName}`} {lastName}<br />
                <small>{moment(createdAt, 'x').fromNow()}</small>
              </Link>
            </span>
          </CardBody>
          <CardTitle>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="text-dark bg-white border border-white 2rem mt-0 pt-0 pr-2 btn-outline-light">
                ...
              </DropdownToggle>
              <DropdownMenu>
                {
                  me._id === ownerId
                    ? <DropdownItem className="drop-item" onClick={handleRemovePost}>Remove</DropdownItem>
                    : null
                }
                <DropdownItem className="drop-item">Edit</DropdownItem>
                <DropdownItem className="drop-item">Save</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardTitle>
        </span>
        <hr className="m-0" />
        <CardBody>
          <CardText tag="span"><p>{body}</p></CardText>
        </CardBody>
      </Card>
    </div>
  );
};


const Feed = ({ posts, handleRemovePost }) => {
  const me = useMe();
  const [activeTab, setActiveTab] = useState('1');
  const toggle = React.useCallback((tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  }, [activeTab]);
  const myPosts = useMemo(() => posts.filter((post) => (
    me._id === post.ownerId)), [me._id, posts]);
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
          <>
            {posts.map((post) => (
              <Post
                key={post._id}
                handleRemovePost={() => handleRemovePost({ _id: post._id })}
                {...post}

              />
            ))}
          </>
        </TabPane>
        <TabPane tabId="2">
          <>
            {myPosts.length > 0 ? myPosts.map((post) => (
              <Post
                key={post._id}
                handleRemovePost={() => handleRemovePost({ _id: post._id })}
                {...post}
              />)) : (
                <Card className="post-card border-0 " outline color="secondary">
                  <CardBody>
                    <ListGroupItem style={{ backgroundColor: 'beige', minHeight: '57px' }}>
                      <p style={{ paddingTop: '5px' }}>No posts. Please add your first post</p>
                    </ListGroupItem>
                  </CardBody>
                </Card>)}
          </>
        </TabPane>
      </TabContent>

    </div>
  );
};

export default Feed;
