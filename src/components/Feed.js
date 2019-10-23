import React from 'react';
import {
  Button,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroup,
} from 'reactstrap';

// eslint-disable-next-line no-unused-vars
const Post = ({ id, body, handleRemovePost }) => (
  <ListGroupItem className="d-flex justify-content-between">
    <ListGroupItemHeading>{body}</ListGroupItemHeading>
    <Button onClick={() => handleRemovePost(id)}>
      X
    </Button>
  </ListGroupItem>
);

const Feed = ({ posts, handleRemovePost }) => (
  <ListGroup>
    {posts.map((post) => (
      <Post
        key={post.id}
        id={post.id}
        body={post.body}
        handleRemovePost={handleRemovePost}
      />
    ))}
  </ListGroup>
);

export default Feed;
