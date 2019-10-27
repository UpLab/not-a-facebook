import React from 'react';
import {
  Card, CardBody, Button, CardImg, CardHeader,
} from 'reactstrap';
import _ from 'lodash';
import UsersModel from '../modules/users';
// eslint-disable-next-line no-unused-vars
const Post = ({ body, handleRemovePost, userId }) => {
  const user = UsersModel.getUser(userId);
  const me = UsersModel.me();
  return (
    <div className="post-form">
      <Card className="post-card" outline color="secondary">
        {_.isEmpty(user) ? null : (
          <Card className="d-flex flex-row px-2 pt-2">
            <CardImg
              className="float-left"
              style={{ width: '40px', height: '40px' }}
              src={user.profile.avatar}
              alt="avatar"
            />
            <CardHeader className="bg-white border-0 w-auto">
              {user.profile.firstName + user.profile.lastName}
            </CardHeader>
          </Card>
        )}

        <CardBody style={{ height: '200px' }}>
          <p>{body}</p>
          {_.isEmpty(me) || _.isEmpty(user) || user.id !== me.id ? null : <Button color="danger" onClick={handleRemovePost}>remove</Button>}
          {' '}
        </CardBody>
      </Card>
    </div>
  );
};


const Feed = ({ posts, handleRemovePost }) => (
  <div>
    {posts.map((post) => (
      <Post
        key={post.id}
        body={post.body}
        userId={post.userId}
        handleRemovePost={() => handleRemovePost({ id: post.id })}
      />
    ))}
  </div>
);

export default Feed;
