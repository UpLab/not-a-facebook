import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import faker from 'faker';
import UsersModel from '../modules/users';
import ModalForm from '../components/ModalForm';

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
    error: { active: false, message: '' },
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
      this.setState({ error: { active: false, message: '' } });
    } catch (error) {
      this.setState({ error: { active: true, message: error } });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      username, password, isLogin, error,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button type="button" onClick={this.toggleForm}>Toggle Form</Button>
        <Input type="text" name="username" value={username} onChange={this.handleChange} />
        <Input type="password" name="password" value={password} onChange={this.handleChange} />
        <Button type="submit">{isLogin ? 'Log In' : 'Create Account'}</Button>
        {
          error.active && <ModalForm>{ error.message.toString() }</ModalForm>
        }
      </Form>
    );
  }
}

export default LoginForm;
