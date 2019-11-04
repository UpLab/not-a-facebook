import React, {
  useContext, useMemo, useState, useCallback,
} from 'react';
import {
  Col, Form, Button, FormGroup, Label, Input, Media, Spinner,
} from 'reactstrap';
import { toast } from 'react-toastify';
import _ from 'lodash';
import ThemeContext from '../contexts/Theme';
import UsersModel from '../modules/users';
import Uploader from '../modules/uploader';
import Select from '../components/Select';


const useUserForm = (user) => {
  const currentUser = useMemo(() => user || UsersModel.me(), [user]);
  const [state, setState] = useState({
    avatar: currentUser.profile.avatar,
    newAvatar: null,
    username: currentUser.username,
    firstName: currentUser.profile.firstName,
    lastName: currentUser.profile.lastName,
    password: '',
    newPassword: '',
    isUploading: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }, []);

  const validation = useCallback(() => {
    const {
      firstName, lastName, password, newPassword, username,
    } = state;
    const userByUserName = UsersModel.getUserByUsername(username);
    const encryptPassword = UsersModel.encrypt(password);
    if (!_.isEmpty(password) && encryptPassword !== currentUser.password) throw new Error('invalid password');
    if (!_.isEmpty(password) && _.isEmpty(newPassword)) throw new Error('invalid  new password');
    if (userByUserName && userByUserName.id !== currentUser.id) throw new Error('Username already taken!');
    if (_.isEmpty(firstName) || _.isEmpty(lastName) || _.isEmpty(username)) throw new Error('invalid date');
    return true;
  }, [currentUser.id, currentUser.password, state]);

  const uploadAvatar = async (newAvatar) => {
    const url = await Uploader.upload(newAvatar);
    return url;
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    let newAvatar = e.target.newAvatar.files[0];
    const {
      firstName, lastName, password, newPassword, username, avatar,
    } = state;
    const newUser = {
      id: currentUser.id,
      username,
      password: _.isEmpty(password) ? currentUser.password : UsersModel.encrypt(newPassword),
      profile: { firstName, lastName, avatar },
    };
    try {
      validation();
      if (newAvatar) {
        setState((s) => ({ ...s, isUploading: true }));
        newAvatar = await uploadAvatar(newAvatar) || avatar;
        setState((s) => ({ ...s, avatar: newAvatar, isUploading: false }));
        newUser.profile.avatar = newAvatar;
      }

      UsersModel.update(newUser);
      currentUser.password = newUser.password;
      toast.success('Success');
    } catch (error) {
      setState((s) => ({ ...s, isUploading: false }));
      toast.error(error.message);
    }
  }, [currentUser.id, currentUser.password, state, validation]);

  return [state, handleChange, handleSubmit];
};


const UserProfilePage = () => {
  const [state, handleChange, handleSubmit] = useUserForm();
  const {
    username, firstName, lastName, password, avatar, newPassword, isUploading,
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
        <FormGroup row>
          <Label sm={3}>
            Avatar
          </Label>
          <Col sm={9}>
            <Input type="file" name="newAvatar" onChange={handleChange} />
          </Col>

        </FormGroup>
        <FormGroup check row> {isUploading ? <Spinner style={{ width: '2rem', height: '2rem' }} /> : null}
          <Col sm={{ offset: 9 }}>
            <Button
              className="button"
            >
              Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default UserProfilePage;
