import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button,
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
          <CardImg className="avatar mt-3" src={profile.avatar} />
          <CardTitle className="mr-auto ml-auto">
            <Button className="button">Follow</Button>
            <Button className="button">Message</Button>
          </CardTitle>
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
