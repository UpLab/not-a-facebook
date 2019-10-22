import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
// import posts from '../__mocks__/posts';

let posts = localStorage.getItem('posts');
posts = posts?JSON.parse(localStorage.getItem('posts')):[];

class FeedPage extends Component {
  state = {
    posts: posts,
  }

  handleAddPost = (post) => {
    this.setState((prevState) => ({ posts: [post, ...prevState.posts] }));

    setTimeout(()=>{ localStorage.setItem('posts', JSON.stringify(this.state.posts)); }, 2000);
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
