/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import PostForm from './PostForm';
import { createPost } from '../../utils/creators';
import UsersModel from '../../modules/users';

class PostFormContainer extends Component {
  state = {
    textAreaVisible: true,
    body: '',
    isLoggedIn: UsersModel.isLoggedIn(),
    error: false,
    errorMessage: '',
  }

  toggleTextArea = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.setState((prevState) => ({ textAreaVisible: !prevState.textAreaVisible }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const bodyPost = e.target.body.value;
    const user = UsersModel.currentUser;
    const { handleAddPost } = this.props;
    const post = createPost(bodyPost, user.id);

    if (UsersModel.isLoggedIn() && user) {
      handleAddPost(post);
      this.setState({
        isLoggedIn: UsersModel.isLoggedIn(), body: '', error: false, errorMessage: '',
      });
    } else {
      this.setState({
        isLoggedIn: UsersModel.isLoggedIn(),
        error: true,
        errorMessage: 'You must log in for create post!.Please log in or sign up',
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      textAreaVisible, body, isLoggedIn, errorMessage, error,
    } = this.state;
    console.log(errorMessage);
    return (
      <>
        <Alert color="danger" isOpen={error}>
          {errorMessage}
        </Alert>
        <PostForm
          isLoggedIn={isLoggedIn}
          toggleTextArea={this.toggleTextArea}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          textAreaVisible={textAreaVisible}
          body={body}
        />
      </>
    );
  }
}

PostFormContainer.propTypes = {
  handleAddPost: PropTypes.func.isRequired,
};

export default PostFormContainer;
