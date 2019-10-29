import React, { useState } from 'react';
import { Input, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import routes from '../routes';

const ForgotPasswordPage = () => {
  const [form, setValues] = useState({
    username: '',
  });

  const updateField = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center">Password reset</h2>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={updateField}
      />
      <Button
        className="login-form-submit"
        type="submit"
        color="secondary"
        disabled={!form.username}
      >
                Submit
      </Button>
      <div>
                Don&apos;t have an account? <Link to={routes.signUp}>Sign up</Link>
        <br />
                Forgot password? <Link to={routes.forgotPassword}>Reset password</Link>
      </div>
    </Form>
  );
};


export default ForgotPasswordPage;
