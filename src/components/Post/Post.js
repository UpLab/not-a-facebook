import React from 'react';
import {
  Button,
} from 'reactstrap';

// eslint-disable-next-line no-unused-vars
const Post = ({ body, handleClick }) => (
  <div>
    <p>{body}</p>
    <div className="text-right">
      <Button type="submit" color="primary" onClick={handleClick}>Remove</Button>
    </div>
  </div>
);


export default Post;
