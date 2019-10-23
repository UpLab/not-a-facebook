import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

// eslint-disable-next-line no-unused-vars
const Post = ({ body, handleRemovePost }) => (
  <div className='post-form'>
     <Card className='post-card' outline color="secondary">
        <CardBody>
          <CardTitle>Title: </CardTitle>
          <p className="text-muted">{body}</p>
          <Button color="danger" onClick={handleRemovePost} >remove</Button>{' '}
        </CardBody>
      </Card>
  </div>
);

const Feed = ({ posts, handleRemovePost }) => (
  <div>
    { posts.map((post) => (
      <Post key={post.id} body={post.body} handleRemovePost={() => handleRemovePost({id: post.id})} />
    ))}
  </div>
);

export default Feed;
