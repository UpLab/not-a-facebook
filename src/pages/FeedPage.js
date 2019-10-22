import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
// import posts from '../__mocks__/posts';


class FeedPage extends Component {
  state = {
    posts: this.getPostsFromLoacalStorage(),
  }


  getPostsFromLoacalStorage(){
    let posts = JSON.parse(localStorage.getItem('posts'));

    if(posts)
      return posts;
  }

  handleAddPost = (post) => {

    this.setState((prevState) => ({ posts: [post, ...prevState.posts] }), ()=>{
      this.savePostInLoacalStorage();
    });
  }

  savePostInLoacalStorage(){
    return localStorage.setItem('posts', JSON.stringify(this.state.posts)); ;    
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
