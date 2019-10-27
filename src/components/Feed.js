import React from 'react';
import {
  Card, CardBody, Button, CardImg, CardHeader, CardTitle,
} from 'reactstrap';

const Post = ({
  body, firstName, lastName, avatar, handleRemovePost,
}) => (
  <div className="post-form">
    <Card className="post-card" outline color="secondary">
      <CardHeader className="d-flex space-between">
        <CardImg className="avatar" src={avatar} />
        <CardTitle className="align-self-end">{`${firstName} ${lastName}`}</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="text-muted">{body}</p>
        <Button color="danger" onClick={handleRemovePost}>remove</Button>
        {' '}
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
        firstName={post.firstName}
        lastName={post.lastName}
        avatar={post.avatar}
        handleRemovePost={() => handleRemovePost({ id: post.id })}
      />
    ))}
  </div>
);

export default Feed;
