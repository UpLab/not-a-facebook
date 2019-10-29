import React from 'react';
import {
  Card, CardBody, Button,
  ListGroupItem, Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import UsersModule from '../modules/users';
// eslint-disable-next-line no-unused-vars
const Post = ({ body, ownerId, handleRemovePost }) => {
  const owner = UsersModule.getUser(ownerId);
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
            <Link className='text-body' to={`/profile/${owner.id}`}>{firstName}  {lastName}</Link>
          </ListGroupItem>
          <ListGroupItem><p className="text-muted">{body}</p></ListGroupItem>
          <Button color="danger" onClick={handleRemovePost}>remove</Button>
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
        ownerId={post.ownerId}
        handleRemovePost={() => handleRemovePost({
          id: post.id,
          creatorsProfile: post.creatorsProfile,
        })}
      />
    ))}
  </div>
);

export default Feed;
