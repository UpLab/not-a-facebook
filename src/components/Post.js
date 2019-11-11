import React, { useContext } from 'react';
import {
  Card, CardBody, CardText, CardTitle, Media,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useMe from '../hooks/useMe';
import routes from '../router/routes';
import ThemeContext from '../contexts/Theme';


const Post = ({
  body, creator: owner, handleRemovePost, createdAt,
}) => {
  const [me] = useMe();
  const { _id: ownerId } = owner;
  const { avatar, firstName, lastName } = owner.profile;
  const { theme } = useContext(ThemeContext);

  const submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to remove your post?!!!1.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleRemovePost(),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  let style;
  if (theme === 'dark') {
    style = {
      backgroundColor: 'rgb(11, 16, 21)',
      color: 'white',
    };
  }

  return (
    <div className="post-form">
      <Card style={style}>
        <span className="d-flex mb-0">
          <CardBody className="pb-2 pl-2 pt-2">
            <span className="d-flex">
              <Media
                className="icon"
                src={avatar}
                alt="pic"
              />
              <Link
                to={me._id === ownerId ? `${routes.profile}` : `${routes.profile}/${owner.username}`}
                className="text-dark mt-2 ml-2"
              >
                {` ${firstName}`} {lastName}<br />
                <small>{moment(createdAt, 'x').fromNow()}</small>
              </Link>
            </span>
          </CardBody>
          <CardTitle className="border border-white 2rem mt-0 pt-0 pr-2 btn-outline-light">

            {me._id === ownerId
              ? <Button className="border-0 bg-white text-dark" onClick={submit}>X</Button>
              : null}

          </CardTitle>
        </span>
        <hr className="m-0" />
        <CardBody>
          <CardText tag="span"><p>{body}</p></CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Post;
