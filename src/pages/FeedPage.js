import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: [],
  }

  handleAddPost = (post) => {
    this.setState((prevState) => ({ posts: [post, ...prevState.posts] }));
  }

  render() {
    const { posts } = this.state;
    return (
      <>
        <PostForm handleAddPost={this.handleAddPost} />
        <Feed posts={posts} />
      </>
    );
  }
}

export default FeedPage;
