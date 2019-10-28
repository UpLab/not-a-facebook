import React, { Component } from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import PostsModel from '../modules/posts';
import UsersModel from '../modules/users';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: PostsModel.get(),
    currentUser: UsersModel.me(),
  }

  handleAddPost = (post) => {
    PostsModel.add(post);
    const posts = PostsModel.get();
    this.setState({ posts });
  }

  handleRemovePost = (post) => {
    const { currentUser } = this.state;
    if (_.isEqual(currentUser.profile, post.creatorsProfile)) {
      PostsModel.remove(post);
      const posts = PostsModel.get();
      this.setState({ posts });
    }
  }

  render() {
    const { posts, currentUser } = this.state;
    return (
      <>
        { !currentUser ? (<Redirect to="/login" />) : (
          <>
            <PostForm handleAddPost={this.handleAddPost} />
            <Feed posts={posts} handleRemovePost={this.handleRemovePost} />
          </>
        )}
      </>
    );
  }
}

export default FeedPage;
