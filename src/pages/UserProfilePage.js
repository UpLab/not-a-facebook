import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UsersModel from '../modules/users';
// import posts from '../__mocks__/posts';

class UserProfilePage extends Component {
  state = {
    currentUser: UsersModel.me(),
  }

  render() {
    console.log(this.props);
    const { currentUser } = this.state;
    return (
      <>
        {!currentUser ? (<Redirect to="/login" />) : (
          <>
            Hello world
          </>
        )}
      </>
    );
  }
}

export default UserProfilePage;
