import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button, Spinner,
} from 'reactstrap';
import useUser from '../hooks/useUser';

// eslint-disable-next-line react/prefer-stateless-function
const UserPage = (props) => {
  const { match: { params: { username } } } = props;
  const { user, loading } = useUser(username);
  if (loading) return <Spinner style={{ width: '2rem', height: '2rem' }} />;
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
};


export default UserPage;
