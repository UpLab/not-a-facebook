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
    errLogin: { active: false, message: '' },
  }

  toggleForm = () => {
    this.setState(({ isLogin }) => ({ isLogin: !isLogin }));
    this.setState({ errLogin: { active: false, message: '' } });
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
      this.setState({ errLogin: { active: false, message: '' } });
    } catch (error) {
      this.setState({ errLogin: { active: true, message: error } });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onDismiss = () => {
    this.setState({ errLogin: { active: false, message: '' } });
  }

  render() {
    const {
      username, password, isLogin, errLogin,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button type="button" onClick={this.toggleForm}>Toggle Form</Button>
        <Input type="text" name="username" value={username} onChange={this.handleChange} />
        <Input type="password" name="password" value={password} pattern="^(?=\w).{8,}$" onChange={this.handleChange} />
        <Button type="submit">{ isLogin ? 'Log In' : 'Create Account' }</Button>
        <Alert color="danger" isOpen={errLogin.active} toggle={this.onDismiss}>
          {errLogin.message.toString()}
        </Alert>
      </Form>
    );
  }
}

export default LoginForm;
