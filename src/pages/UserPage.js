import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle,
} from 'reactstrap';
import UserModel from '../modules/users';

// eslint-disable-next-line react/prefer-stateless-function
class UserPage extends React.Component {
  render() {
    const { match: { params: { username } } } = this.props;
    const user = UserModel.getUserByUsername(username);
    // const user = UserModel.getUser(id);
    const { profile } = user;
    return (
      <div>
        <Card>
          <CardImg style={{ width: 200, height: 200 }} className="avatar" src={profile.avatar} />
          <CardBody>
            <CardTitle>{profile.firstName}</CardTitle>
            <CardTitle>{profile.lastName}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserPage;
