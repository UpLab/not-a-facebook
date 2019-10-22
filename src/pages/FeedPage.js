import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: [],
  }

  handleAddPost = (post) => {
    // eslint-disable-next-line max-len
    this.setState((prevState) => ({ posts: [post, ...prevState.posts] }), () => this.savePostsLocalStorage());
  }

  savePostsLocalStorage = () => {
    // eslint-disable-next-line react/destructuring-assignment
    localStorage.setItem('posts', JSON.stringify(this.state.posts));
  }

  getPostsLocalStorage = () => {
    // eslint-disable-next-line prefer-const
    let posts = JSON.parse(localStorage.getItem('posts'));
    if (posts) { return posts; }
    return [];
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

  // eslint-disable-next-line react/sort-comp
  getAcrossPost() {
    this.setState({ posts: this.getPostsLocalStorage() });
  }
}

export default FeedPage;
