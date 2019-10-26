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
<<<<<<< HEAD
    this.setState({ posts });
  }

=======
    this.setState({ posts });    
  }
>>>>>>> 9384d0e6ce6d7b3f88b8ea97fa900087e6ded89d
  render() {
    const { posts } = this.state;
    return (
      <>
        <PostForm handleAddPost={this.handleAddPost} />
<<<<<<< HEAD
        <Feed posts={posts} handleRemovePost={this.handleRemovePost} />
=======
        <Feed posts={posts} handleRemovePost={this.handleRemovePost}/>
>>>>>>> 9384d0e6ce6d7b3f88b8ea97fa900087e6ded89d
      </>
    );
  }
}

export default FeedPage;
