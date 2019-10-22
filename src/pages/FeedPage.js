import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';

class FeedPage extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }

  handleAddPost = (post) => {
    const { posts } = this.state;
    const newPosts = [...posts, post];

    this.savePosts(newPosts);
    this.setState({ posts: newPosts });
  };

  savePosts = (posts) => {
    localStorage.setItem('save_posts', JSON.stringify(posts));
  };

  loadPosts = () => {
    const posts = localStorage.getItem('save_posts');

    this.setState({ posts: JSON.parse(posts) || [] });
  };

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
