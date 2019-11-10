import React, { useContext } from 'react';
import {
  Col, Form, Button, FormGroup, Label, Input, Media, Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/Theme';
import Select from '../components/Select';
import routes from '../router/routes';
import useUserForm from '../hooks/useUserForm';


const UserProfilePage = () => {
  const [state, handleChange, handleSubmit] = useUserForm();
  const {
    username, firstName, lastName, avatar, isUploading,
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
          <Label sm={3}>
            Avatar
          </Label>
          <Col sm={9}>
            <Input type="file" name="newAvatar" onChange={handleChange} />
          </Col>

        </FormGroup>

        {isUploading ? <Spinner style={{ width: '2rem', height: '2rem' }} /> : null}
        <Col className="clearfix">
          <Link to={routes.changePassword}>
            <Button className="button" type="button" style={{ float: 'left', marginLeft: '0' }}>  Change Password</Button>
          </Link>
          <Button
            style={{ float: 'right' }}
            className="button"
          >
            Save changes
          </Button>
        </Col>
      </Form>


    </>
  );
};

export default UserProfilePage;
