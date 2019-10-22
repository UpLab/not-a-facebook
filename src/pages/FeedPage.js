import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import PostsModel from '../modules/posts';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: PostsModel.get(),
  }

  componentDidMount() {
    this.getPostsFromLoacalStorage();
  }

  getPostsFromLoacalStorage() {
    const posts = JSON.parse(localStorage.getItem('posts'));

    if (posts) { this.setState(posts); }
  }

  savePostInLoacalStorage() {
    return localStorage.setItem('posts', JSON.stringify(this.state.posts));
  }

  handleAddPost = (post) => {
    PostsModel.add(post);
    const posts = PostsModel.get();
    this.setState({ posts });
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
