/* eslint-disable no-console */
import React from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

// function submit(e) {
//   e.preventDefault();
//   const post = {
//     title: e.target.title.value,
//     body: e.target.body.value,
//   };
//   alert(JSON.stringify(post));
// }

const PostForm = ({
  handleSubmit, textAreaVisible, handleChange, body, toggleTextArea,
}) => (
  <Form onSubmit={handleSubmit}>
    {textAreaVisible && (
      <FormGroup>
        <Label>New post</Label>
        <Input type="textarea" name="body" onChange={handleChange} value={body} />
      </FormGroup>
    )}
    <div className="text-right">
      <Button type="submit" color="primary" disabled={!body}>Submit</Button>
    </div>
    <Button type="button" onClick={toggleTextArea}>Toggle Text Area</Button>
  </Form>
);

export default PostForm;
