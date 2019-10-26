import React from 'react';
<<<<<<< HEAD
import {
  Card, CardBody, Button,
} from 'reactstrap';

// eslint-disable-next-line no-unused-vars
const Post = ({ body, handleRemovePost }) => (
  <div className="post-form">
    <Card className="post-card" outline color="secondary">
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
        handleRemovePost={() => handleRemovePost({ id: post.id })}
      />
    ))}
=======
import Post  from './Post';
// eslint-disable-next-line no-unused-vars

const Feed = ({ posts, handleRemovePost }) => (
  <div>
    { posts.map((post) => (
        <Post post={post} handleRemovePost={handleRemovePost.bind(this, {id: post.id})}/>
      ))
    }
>>>>>>> 9384d0e6ce6d7b3f88b8ea97fa900087e6ded89d
  </div>
);

export default Feed;
