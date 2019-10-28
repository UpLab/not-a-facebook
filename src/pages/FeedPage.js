import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import PostsModel from '../modules/posts';

class FeedPage extends Component {
  state = {
    posts: PostsModel.get(),
  }

  handleAddPost = (post) => {
    PostsModel.add(post);
    const posts = PostsModel.get();
    this.setState({ posts });
  }

  handleRemovePost = (post) => {
    PostsModel.remove(post);
    const posts = PostsModel.get();
    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;
    const { currentUser } = this.props;
    return (
      <>
        <PostForm handleAddPost={this.handleAddPost} />
        <Feed currentUser={currentUser} posts={posts} handleRemovePost={this.handleRemovePost} />

      </>
    );
  }
}

export default FeedPage;
