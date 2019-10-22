import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: [],
  }

  handleAddPost = (post) => {
    this.setState((prevState) => ({ posts: [post, ...prevState.posts] }), () => this.savePosts());
  }

  savePosts = () => {
    localStorage.setItem('posts', JSON.stringify(this.state.posts));
  }

  getPosts = () => {
    let posts = JSON.parse(localStorage.getItem('posts'));
    if (posts)
      return posts;
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

  componentDidMount() {
    this.setState({ posts: this.getPosts() });
  }
}
export default FeedPage;
