import React, { Component } from 'react';
import {
  Form, Input, Button, Alert,
} from 'reactstrap';
import faker from 'faker';

import UsersModel from '../modules/users';

const mockProfile = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.internet.avatar(),
});

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isLogin: true,
    isLoggedIn: UsersModel.isLoggedIn(),
    error: false,
    errorMessage: '',
  }

  toggleForm = () => {
    this.setState(({ isLogin }) => ({ isLogin: !isLogin }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, isLogin } = this.state;
    try {
      if (isLogin) {
        UsersModel.login(username, password);
      } else {
        UsersModel.createAccount(username, password, mockProfile());
      }
      this.setState({
        error: false, errorMessage: '',
      });
    } catch (error) {
      this.setState({
        error: true, errorMessage: error.message.toString(),
      });
    }
    this.setState({ isLoggedIn: UsersModel.isLoggedIn() });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLogOut = () => {
    UsersModel.logout();
    this.setState({ isLoggedIn: UsersModel.isLoggedIn() });
  }

  render() {
    const {
      username, password, isLogin, isLoggedIn, error, errorMessage,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Alert color="danger" isOpen={error}>
          {errorMessage}
        </Alert>
        <Button type="button" onClick={this.toggleForm}>Toggle Form</Button>
        <Input type="text" name="username" value={username} onChange={this.handleChange} />
        <Input type="password" name="password" value={password} onChange={this.handleChange} />
        <Button type="submit" disabled={isLoggedIn}>{isLogin ? 'Log In' : 'Create Account'}</Button>
        <Button type="button" disabled={!isLoggedIn} onClick={this.handleLogOut}>Log out</Button>
      </Form>
    );
  }
}

export default LoginForm;
