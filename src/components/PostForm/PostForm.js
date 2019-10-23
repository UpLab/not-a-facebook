/* eslint-disable no-console */
import React from 'react';
import {
  Button, Form, FormGroup, Label, Input,Row, Col, Container
} from 'reactstrap';

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
      <Container>
        <Row>
        <Col className="text-left"> <Button type="button" onClick={toggleTextArea}>Toggle Text Area</Button>
          </Col>
          <Col className="text-right">
            <Button type="submit" color="primary" disabled={!body}>Submit</Button>
          </Col >
          </Row>
      </Container>
    </Form>
  );

export default PostForm;
