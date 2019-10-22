import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    this.getPostsFromLocalStorage();
  }

  handleAddPost = (post) => {
    this.setState((prevState) => ({ posts: [post, ...prevState.posts] }), () => {
      this.saveToLocalStorage();
    });
  }

  getPostsFromLocalStorage = () => {
    const posts = JSON.parse(localStorage.getItem('posts'));
    if (posts) {
      this.setState({ posts });
    }
  }

  saveToLocalStorage = () => {
    const { posts } = this.state;
    localStorage.setItem('posts', JSON.stringify(posts));
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
