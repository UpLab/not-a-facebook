import React, { Component } from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
// import posts from '../__mocks__/posts';

console.log(JSON.parse(localStorage.getItem('posts')));

class FeedPage extends Component {
  state = {
    posts: [],
  }

  componentDidMount(){ 
    this.getPostsFromLoacalStorage();
  }

  getPostsFromLoacalStorage(){
    let posts = JSON.parse(localStorage.getItem('posts'));

    if(posts)
      this.setState(posts);
 }

  savePostInLoacalStorage(){
    return localStorage.setItem('posts', JSON.stringify(this.state.posts)); ;    
  }

  handleAddPost = (post) => {
    this.setState((prevState) => ({ posts: [post, ...prevState.posts] }), ()=>{
      this.savePostInLoacalStorage();
    });
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
