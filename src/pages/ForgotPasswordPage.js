import React, { useState } from 'react';
import { Input, Button, Form } from 'reactstrap';

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
    </Form>
  );
};


export default ForgotPasswordPage;
