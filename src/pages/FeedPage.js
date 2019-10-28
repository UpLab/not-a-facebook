import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import PostsModel from '../modules/posts';
import UsersModel from '../modules/users';
import ModalForm from '../components/ModalForm';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: PostsModel.get(),
    error: { active: false, message: '' },
  }

  handleAddPost = (post) => {
    try {
      PostsModel.add(post);
      UsersModel.addPost(post);
      const posts = PostsModel.get();
      this.setState({ posts });
      this.setState({ error: { active: false, message: '' } });
    } catch (error) {
      this.setState({ error: { active: true, message: error } });
    }
  }

  handleRemovePost = (post) => {
    try {
      PostsModel.remove(post);
      const posts = PostsModel.get();
      this.setState({ posts });
      this.setState({ error: { active: false, message: '' } });
    } catch (error) {
      this.setState({ error: { active: true, message: error } });
    }
  }

  render() {
    const { posts, error } = this.state;
    return (
      <>
        <PostForm handleAddPost={this.handleAddPost} />
        <Feed posts={posts} handleRemovePost={this.handleRemovePost} />
        {
          error.active && <ModalForm>{error.message.toString()}</ModalForm>
        }
      </>
    );
  }
}

export default FeedPage;
