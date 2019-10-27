import React, { Component } from 'react';
import Post from './Post';


class PostContainer extends Component {
  state = {
    id: '',
    createAt: '',
    body: '',
    // profile: null,
  }

  constructor(props) {
    super(props);
    this.id = props.post.id;
    this.createAt = props.post.createAt;
    this.body = props.post.body;
    //   this.profile = props.post.profile;
  }

  render() {
    /*
    <Post
        profile={this.profile}
        handleClick={this.props.handleRemovePost}
        body={this.body}
      />
    */
    return (
      <Post
        handleClick={this.props.handleRemovePost}
        body={this.body}
      />
    );
  }
}

export default PostContainer;
