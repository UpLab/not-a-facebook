import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
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
  }

  toggleForm = () => {
    this.setState(({ isLogin }) => ({ isLogin: !isLogin }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, isLogin } = this.state;
    if (isLogin) {
      UsersModel.login(username, password);
    } else {
      UsersModel.createAccount(username, password, mockProfile());
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password, isLogin } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button type="button" onClick={this.toggleForm}>Toggle Form</Button>
        <Input type="text" name="username" value={username} onChange={this.handleChange} />
        <Input type="password" name="password" value={password} onChange={this.handleChange} />
        <Button type="submit">{ isLogin ? 'Log In' : 'Create Account' }</Button>
      </Form>
    );
  }
}

export default LoginForm;
