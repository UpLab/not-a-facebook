import React from 'react';
import { Card, CardBody, Media } from 'reactstrap';
import UsersModel from '../modules/users';
// import posts from '../__mocks__/posts';

const UserProfilePage = (props) => {
  const { match } = props;
  const { id } = match.params;
  let user;
  if (id) {
    user = UsersModel.getUser(id);
  } else {
    user = UsersModel.me();
  }
  const { username, lastLoginDate } = user;
  const { avatar, firstName, lastName } = user.profile;
  return (
    <>
      <Card className="post-card mt-2">
        <CardBody>
          <Media
            className="mx-auto"
            width="150px"
            src={avatar}
            style={{ borderRadius: '50%' }}
            alt="pic"
          />
          <p className="text-muted">userName: {username}</p>
          <p className="text-muted">name: {firstName}  {lastName}</p>
          <p className="text-muted">Last login date: {typeof lastLoginDate === 'object' ? lastLoginDate[0] : lastLoginDate}</p>
        </CardBody>
      </Card>
    </>
  );
};

export default UserProfilePage;
