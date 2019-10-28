import React from 'react';
import {
  Card, CardBody, Button,
  ListGroupItem, Media,
} from 'reactstrap';

// eslint-disable-next-line no-unused-vars
const Post = ({ body, creatorsProfile, handleRemovePost }) => (
  <div className="post-form">
    <Card className="post-card" outline color="secondary">
      <CardBody>
        <ListGroupItem active>
          <Media
            left
            width="35px"
            src={creatorsProfile.avatar}
            style={{ borderRadius: '5px' }}
            alt="pic"
          />
          {' '}
          {creatorsProfile.firstName}
          {' '}
          {creatorsProfile.lastName}
        </ListGroupItem>
        <ListGroupItem><p className="text-muted">{body}</p></ListGroupItem>
        <Button color="danger" onClick={handleRemovePost}>remove</Button>
      </CardBody>
    </Card>
  </div>
);

const Feed = ({ posts, handleRemovePost }) => (
  <div>
    {posts.map((post) => (
      <Post
        key={post.id}
        body={post.body}
        creatorsProfile={post.creatorsProfile}
        handleRemovePost={() => handleRemovePost({
          id: post.id,
          creatorsProfile: post.creatorsProfile,
        })}
      />
    ))}
  </div>
);

export default Feed;
