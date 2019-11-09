import React from 'react';
import {
  Col, Form, Button, FormGroup, Label, Input, Media,
} from 'reactstrap';
import useChangePasswordForm from '../hooks/useChangePasswordForm';


const ChangePasswordPage = () => {
  const [state, handleChange, handleSubmit] = useChangePasswordForm();
  const {
    password, avatar, newPassword,
  } = state;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Col sm={12}>
            <Media className="avatar" src={avatar} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={3}>
                        password
          </Label>
          <Col sm={9}>
            <Input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="new password" sm={3}>
                        New password
          </Label>
          <Col sm={9}>
            <Input
              type="password"
              placeholder="new password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              disabled={password.length === 0}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ offset: 9 }}>
            <Button className="button" disabled={newPassword.length < 4}>
                            Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default ChangePasswordPage;
