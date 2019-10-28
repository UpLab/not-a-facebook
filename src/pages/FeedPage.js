import React, { Component } from 'react';
import _ from 'lodash';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import PostsModel from '../modules/posts';
import UsersModel from '../modules/users';
// import posts from '../__mocks__/posts';

class FeedPage extends Component {
  state = {
    posts: PostsModel.get(),
    curUser: UsersModel.me(),
  }

  handleAddPost = (post) => {
    PostsModel.add(post);
    const posts = PostsModel.get();
    this.setState({ posts });
  }

  handleRemovePost = (post) => {
    const { curUser } = this.state;
    if (_.isEqual(curUser.profile, post.creatorsProfile)) {
      PostsModel.remove(post);
      const posts = PostsModel.get();
      this.setState({ posts });
    }
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
