import React, { Component } from 'react';
import Post from './Post';


class PostContainer extends Component {
  state = {
    id: '',
    createAt: '',
    body: '' 
  }
    constructor(props){
      super(props);
      this.id = props.post.id; 
      this.createAt = props.post.createAt; 
      this.body = props.post.body; 
    }
    render() {
      return (
        <Post
          handleClick={this.props.handleRemovePost}
          body={this.body}
        />
      );
    }
  }
  
  export default PostContainer;

