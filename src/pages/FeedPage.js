import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import PostsModel from '../modules/posts';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: PostsModel.get(),
    user: null,
  }

  handleAddPost = (post) => {
    PostsModel.add(post);
    // PostsModel.addUser(post, this.user);
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
    /*
  <div>
    <PostForm user={this.user} handleAddPost={this.handleAddPost} />
    <Feed posts={posts} handleRemovePost={this.handleRemovePost} />
  </div>
  */
    return (
      <div>
        <PostForm handleAddPost={this.handleAddPost} />
        <Feed posts={posts} handleRemovePost={this.handleRemovePost} />
      </div>
    );
  }
}

export default FeedPage;
