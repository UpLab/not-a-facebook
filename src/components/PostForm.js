/* eslint-disable no-console */
import React from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import usePostForm from '../hooks/usePostForm';

const PostForm = (props) => {
  const [state, handleSubmit, handleChange, toggleTextArea] = usePostForm(props);
  const { body, textAreaVisible } = state;

  return (
    <Form onSubmit={handleSubmit}>
      {textAreaVisible && (
      <FormGroup>
        <Label>New post</Label>
        <Input type="textarea" name="body" onChange={handleChange} value={body} />
      </FormGroup>
      )}
      <div className="text-right">
        <Button type="button" onClick={toggleTextArea} style={{ margin: '15px' }}>Toggle Text Area</Button>
        <Button type="submit" color="primary" disabled={!body}>Submit</Button>
      </div>
    </Form>
  );
};
export default PostForm;
