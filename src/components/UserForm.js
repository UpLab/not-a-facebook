import React from 'react';
import { Alert } from 'reactstrap';

const UserForm = ({ user }) => (
  <Alert color="info" isOpen={user.username !== ''}>
    <b>Username: </b>
    {' '}
    {user.username}
    <br />
    <b>Name: </b>
    {' '}
    {user.profile.firstName}
    {' '}
    {user.profile.lastName}
  </Alert>
);

export default UserForm;
