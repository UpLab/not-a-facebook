import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Col, Form, Button, FormGroup, Label, Input, Media,
} from 'reactstrap';
import UsersModel from '../modules/users';
// import posts from '../__mocks__/posts';

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    const currentUser = UsersModel.me();
    const { username, profile } = currentUser;
    this.state = {
      currentUser,
      username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      password: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      currentUser, username, firstName, lastName, password,
    } = this.state;
    return (
      <>
        {!currentUser ? (<Redirect to="/login" />) : (
          <>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col sm={12}>
                  <Media className="avatar" src={currentUser.profile.avatar} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>Username</Label>
                <Col sm={9}>
                  <Input value={username} name="username" onChange={this.handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>First name</Label>
                <Col sm={9}>
                  <Input value={firstName} name="firstName" onChange={this.handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>Last name</Label>
                <Col sm={9}>
                  <Input value={lastName} name="lastName" onChange={this.handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={3}>Change password</Label>
                <Col sm={9}>
                  <Input
                    type="password"
                    placeholder="new password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleFile" sm={3}>Avatar</Label>
                <Col sm={9}>
                  <Input type="file" name="file" id="exampleFile" />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ offset: 9 }}>
                  <Button>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </>
        )}
      </>
    );
  }
}

export default UserProfilePage;
