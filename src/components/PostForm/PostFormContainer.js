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
    const { handleAddPost } = this.props;
    e.preventDefault();
    const post = {
      body: e.target.body.value,
    };
    handleAddPost(post);
    this.setState({ body: '' });
  }

  handleChange = (e) => {
    this.setState({ body: e.target.value });
  }

  render() {
    const { textAreaVisible, body } = this.state;
    // console.log({ PostFormContainer: this.state });
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
