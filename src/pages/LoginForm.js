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
    errLogin: { active: false, msg: '' },
  }

  toggleForm = () => {
    this.setState(({ isLogin }) => ({ isLogin: !isLogin }));
    this.setState({ errLogin: { active: false, msg: '' } });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, isLogin } = this.state;
    if (isLogin) {
      try {
        UsersModel.login(username, password);
      } catch (err) {
        this.setState({ errLogin: { active: true, msg: err } });
      }
    } else {
      UsersModel.createAccount(username, password, mockProfile());
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      username, password, isLogin, errLogin,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button type="button" onClick={this.toggleForm} color="info" size="sm">Toggle Form</Button>
        <div className="login-form">
          <Alert color="danger" isOpen={errLogin.active}>
            {errLogin.msg.toString()}
          </Alert>
          <Input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
          <Input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
          <Button
            className="login-form-submit"
            type="submit"
            color={isLogin ? 'secondary' : 'primary'}
            disabled={!(username && password)}
          >
            { isLogin ? 'Log In' : 'Sign Up' }
          </Button>
        </div>
      </Form>
    );
  }
}

export default LoginForm;
