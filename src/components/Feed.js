import React, { useMemo } from 'react';
import {
  Card, CardBody, Button,
  ListGroupItem, Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
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
        <CardBody style={{ minHeight: '250px' }}>
          <ListGroupItem style={{ backgroundColor: 'beige' }}>
            <Media
              left
              width="35px"
              src={avatar}
              style={{ borderRadius: '5px', paddingRight: '5px' }}
              alt="pic"
            /><Link className="text-body" to={`${routes.profile}/${me.id !== ownerId ? owner.username : ''}`}>{firstName} {lastName}</Link>
            {me.id === ownerId ? <Button color="danger" onClick={handleRemovePost}>remove</Button> : null}
            <p className="text-muted">{time}</p>
          </ListGroupItem>
          <ListGroupItem style={{ minHeight: 'inherit' }}>
            <p className="text-muted">{body}</p>
          </ListGroupItem>
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
        handleRemovePost={() => handleRemovePost({ id: post.id })}
        {...post}
      />
    ))}
  </div>
);

export default Feed;
