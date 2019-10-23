import React, { Fragment } from 'react';
import { Button, Container, Col, Row, } from 'reactstrap';
// eslint-disable-next-line no-unused-vars
const Post = ({ body, id, handleRemovePost }) => (
  <Container style={{ marginTop: 10 }} >
    <Row>
      <Col>
        <p>{body}</p>
      </Col>
      <Col className="text-right">
        <Button type="button" onClick={handleRemovePost} color="danger">Remove</Button>
      </Col>
    </Row>
  </Container >
);

const Feed = ({ posts, handleRemovePost }) => (
  <div>
    {posts.map((post) => (
      <Post key={post.id} body={post.body} handleRemovePost={() => handleRemovePost({ id: post.id })} />
    ))}
  </div>
);

export default Feed;
