/* eslint-disable no-console */
import React from 'react';
import {
  Button, Form, FormGroup, Input, Card, CardTitle, CardBody,
} from 'reactstrap';
import usePostForm from '../hooks/usePostForm';

const PostForm = (props) => {
  const [state, handleSubmit, handleChange] = usePostForm(props);
  const { body, textAreaVisible } = state;

  return (
    <Form onSubmit={handleSubmit}>
      {textAreaVisible && (
      <FormGroup>
        <Card>
          <CardBody className="pb-2">
            <CardTitle className="">Create post</CardTitle>
            <Input type="textarea" name="body" onChange={handleChange} value={body} />
            <Button
              type="submit"
              style={{ backgroundColor: '#393939' }}
              disabled={!body}
              className="float-right button"
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </FormGroup>
      )}
      {/* <div className="text-right">
       <Button
        type="button"
        onClick={toggleTextArea}
        style={{ margin: '15px' }}
        >
          Toggle Text Area
        </Button>
      </div> */}
    </Form>
  );
};
export default PostForm;
