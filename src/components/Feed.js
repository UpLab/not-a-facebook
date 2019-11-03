import React, { useMemo, useState } from 'react';
import {
  Card, CardBody, Button,
  ListGroupItem, Media, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import UsersModel from '../modules/users';
import routes from '../routes';
import { createTimeAgo } from '../utils/creators';

// eslint-disable-next-line no-unused-vars
const Post = ({
  body, ownerId, handleRemovePost, createdAt,
}) => {
  const me = useMemo(() => UsersModel.me(), []);
  const owner = useMemo(() => UsersModel.getUser(ownerId), [ownerId]);
  const { avatar, firstName, lastName } = owner.profile;
  const time = createTimeAgo(createdAt);
  return (
    <div className="post-form">

      <Card className="post-card border-0 " outline color="secondary">
        <CardBody>
          <ListGroupItem style={{ backgroundColor: 'beige', minHeight: '57px' }}>
            <Media
              className="float-left my-auto"
              left
              width="35px"
              height="35px"
              src={avatar}
              style={{ borderRadius: '50%', marginRight: '5px' }}
              alt="pic"
            />
            <Link
              className="text-body float-left my-auto"
              to={`${routes.profile}/${me.id !== ownerId ? owner.username : ''}`}
              style={{ paddingTop: '5px' }}
            >
              {firstName} {lastName}
            </Link>
            <p
              className="text-muted float-left my-auto"
              style={{ paddingTop: '5px', marginLeft: '3px' }}
            >· {time}
            </p>
            {me.id === ownerId
              ? <Button
                className="float-right my-auto"
                style={{
                  border: '0px', backgroundColor: 'transparent', fontWeight: 'bold', color: 'black',
                }}
                onClick={handleRemovePost}
              >X</Button> : null}

          </ListGroupItem>
          <ListGroupItem style={{ minHeight: 'inherit' }}>
            <p className="text-muted">{body}</p>
          </ListGroupItem>
        </CardBody>
      </Card>
    </div>
  );
};


const Feed = ({ posts, handleRemovePost }) => {
  const me = useMemo(() => UsersModel.me(), []);
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const myPosts = useMemo(() => posts.filter((post) => (
    me.id === post.ownerId)), [me.id, posts]);

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
                key={post.id}
                handleRemovePost={() => handleRemovePost({ id: post.id })}
                {...post}

              />
            ))}
          </>
        </TabPane>
        <TabPane tabId="2">
          <>
            {myPosts.length > 0 ? myPosts.map((post) => (
              <Post
                key={post.id}
                handleRemovePost={() => handleRemovePost({ id: post.id })}
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
