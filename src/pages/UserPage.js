import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, Button, Spinner,
} from 'reactstrap';
import useUserPage from '../hooks/useUserPage';

// eslint-disable-next-line react/prefer-stateless-function
const UserPage = (props) => {
  const [user] = useUserPage(props);

  if (!user) return <Spinner style={{ width: '2rem', height: '2rem' }} />;
  return (
    <div>
      <Card>
        <CardImg className="avatar mt-3" src={user.profile.avatar} />
        <CardTitle className="mr-auto ml-auto">
          <Button className="button">Follow</Button>
          <Button className="button">Message</Button>
        </CardTitle>
        <CardBody>
          <CardTitle>{user.profile.firstName}</CardTitle>
          <CardTitle>{user.profile.lastName}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserPage;
