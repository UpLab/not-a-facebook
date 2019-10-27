/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import { createPost } from '../../utils/creators';
import UsersModel from '../../modules/users';

class PostFormContainer extends Component {
  state = {
    textAreaVisible: true,
    body: '',
    isLoggedIn: UsersModel.isLoggedIn(),
  }

  toggleTextArea = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.setState((prevState) => ({ textAreaVisible: !prevState.textAreaVisible }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { handleAddPost } = this.props;
    const post = createPost(e.target.body.value);
    handleAddPost(post);
    this.setState({ body: '' });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { textAreaVisible, body, isLoggedIn } = this.state;

    return (
      <PostForm
        isLoggedIn={isLoggedIn}
        toggleTextArea={this.toggleTextArea}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        textAreaVisible={textAreaVisible}
        body={body}
      />
    );
  }
}

PostFormContainer.propTypes = {
  handleAddPost: PropTypes.func.isRequired,
};

export default PostFormContainer;
