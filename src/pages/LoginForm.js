import React, { Component } from 'react';
import {
  Form, Input, Button, Alert,
} from 'reactstrap';
import faker from 'faker';
import UserForm from './UserForm';
import UsersModel from '../modules/users';
import FeedPage from './FeedPage';

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
    curUser: null,
  }

  toggleForm = () => {
    this.setState(({ isLogin }) => ({
      isLogin: !isLogin,
      errLogin: { active: false, msg: '' },
    }));
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
        errLogin: { active: false, msg: '' },
        curUser: UsersModel.me(),
        isLogin: true,
      });
    } catch (err) {
      this.setState({ errLogin: { active: true, msg: err } });
    }
  }

  handleLogOut = (e) => {
    e.preventDefault();
    UsersModel.logout(true);
    this.setState({ curUser: UsersModel.me() });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      username, password, isLogin, errLogin,
      curUser,
    } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Button type="button" onClick={this.toggleForm} color="info" size="sm">Toggle Form</Button>
          <UserForm user={curUser || UsersModel.deftUser()} />
          <div className="login-form">
            <Alert color="danger" isOpen={errLogin.active}>
              {errLogin.msg.toString()}
            </Alert>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              pattern="^[a-z0-9_-]{3,15}$"
              onChange={this.handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              title="Для прикладу: 1Aaaaaaa"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
              onChange={this.handleChange}
            />
            <Button
              className="login-form-submit"
              type="submit"
              color={curUser ? 'success' : 'secondary'}
              disabled={!(username && password) || !!curUser}
            >
              { isLogin ? 'Log In' : 'Sign Up' }
            </Button>
            <Button disabled={!curUser} type="button" onClick={this.handleLogOut}>Log Out</Button>
          </div>
        </Form>
        { !!curUser && <FeedPage />}
      </div>
    );
  }
}

export default LoginForm;
