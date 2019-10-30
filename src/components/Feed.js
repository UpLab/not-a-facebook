import React from 'react';
import {
  Card, CardBody, Button,
  ListGroupItem, Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import UsersModel from '../modules/users';
import routes from '../routes';
// eslint-disable-next-line no-unused-vars
const Post = ({ handleRemovePost, body, ownerId }) => {
  const me = UsersModel.me();
  const owner = UsersModel.getUser(ownerId);
  const { avatar, firstName, lastName } = owner.profile;

  return (
    <div className="post-form">
      <Card className="post-card" outline color="secondary">
        <CardBody>
          <ListGroupItem active>
            <Media
              left
              width="35px"
              src={avatar}
              style={{ borderRadius: '5px' }}
              alt="pic"
            />
            <Link className="text-body" to={`${routes.profile}/${me.id !== ownerId ? owner.username : ''}`}>
              <b style={{ color: 'white' }}>{` ${firstName}`} {lastName}</b>
            </Link>
          </ListGroupItem>
          <ListGroupItem><p className="text-muted">{body}</p></ListGroupItem>
          {me.id === ownerId ? <Button color="danger" onClick={handleRemovePost}>remove</Button> : null}
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
