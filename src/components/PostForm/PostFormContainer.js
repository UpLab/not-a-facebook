/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';

class PostFormContainer extends Component {
  state = {
    textAreaVisible: true,
    body: '',
  }

  toggleTextArea = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.setState((prevState) => ({ textAreaVisible: !prevState.textAreaVisible }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { handleAddPost } = this.props;
    handleAddPost(e.target.body.value);
    this.setState({ body: '' });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { textAreaVisible, body } = this.state;
    return (
      <PostForm
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
