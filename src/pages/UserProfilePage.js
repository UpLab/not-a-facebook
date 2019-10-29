import React, { useContext } from 'react';
import {
  Col, Form, Button, FormGroup, Label, Input, Media,
} from 'reactstrap';
import useUserForm from '../hooks/useUserForm';
import ThemeContext from '../contexts/Theme';
import Select from '../components/Select';
// import posts from '../__mocks__/posts';

// const heavyReverseUsername = (username) => {
//   const n = 1;
//   [...new Array(n)].forEach(() => username.split('').reverse().join(''));
//   const reverse = username.split('').reverse().join('');
//   return reverse;
// };

const UserProfilePage = ({ handleSubmit }) => {
  const [state, handleChange] = useUserForm();
  const {
    username, firstName, lastName, password, avatar,
  } = state;

  const { theme, setTheme } = useContext(ThemeContext);
  // const reversedUsername = useMemo(() => heavyReverseUsername(username), [username]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Col sm={12}>
            <Media className="avatar" src={avatar} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="theme" sm={3}>
            Theme
          </Label>
          <Col sm={9}>
            <Select
              value={theme}
              name="theme"
              onChange={(e) => {
                setTheme(e.target.value);
              }}
              options={[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Username
          </Label>
          <Col sm={9}>
            <Input value={username} name="username" onChange={handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            First name
          </Label>
          <Col sm={9}>
            <Input value={firstName} name="firstName" onChange={handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Last name
          </Label>
          <Col sm={9}>
            <Input value={lastName} name="lastName" onChange={handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={3}>
            Change password
          </Label>
          <Col sm={9}>
            <Input
              type="password"
              placeholder="new password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={3}>
            Avatar
          </Label>
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
  );
};

export default UserProfilePage;
