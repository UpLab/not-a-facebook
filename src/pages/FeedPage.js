import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import PostsModel from '../modules/posts';

// import posts from '../__mocks__/posts';
export const { Provider, Consumer } = React.createContext();

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


    return (
      <>
        <PostForm handleAddPost={this.handleAddPost} />
        <Feed posts={posts} handleRemovePost={this.handleRemovePost} />
      </>
    );
  }
}

export default FeedPage;
