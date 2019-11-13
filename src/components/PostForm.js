/* eslint-disable no-console */
import React, { useContext } from 'react';
import {
  Button, Form, FormGroup, Input, Card, CardTitle, CardBody,
} from 'reactstrap';
import usePostForm from '../hooks/usePostForm';
import ThemeContext from '../contexts/Theme';
import Theme from '../modules/theme';

const PostForm = ({ onSubmit }) => {
  const [state, handleSubmit, handleChange] = usePostForm(onSubmit);
  const { body, textAreaVisible } = state;
  const { theme } = useContext(ThemeContext);
  const style = Theme.getStyle(theme);
  return (
    <Form onSubmit={handleSubmit}>
      {textAreaVisible && (
        <FormGroup>
          <Card style={style}>
            <CardBody className="pb-2">
              <CardTitle className="">Create post</CardTitle>
              <Input type="textarea" name="body" onChange={handleChange} value={body} style={style} />
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
