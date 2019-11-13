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
import Theme from '../modules/theme';

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
  const style = Theme.getStyle(theme);

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
                style={style}
                to={me._id === ownerId ? `${routes.profile}` : `${routes.profile}/${owner.username}`}
                className="mt-2 ml-2"
              >
                {` ${firstName}`} {lastName}<br />
                <small>{moment(createdAt, 'x').fromNow()}</small>
              </Link>
            </span>
          </CardBody>
          <CardTitle>

            {me._id === ownerId
              ? <Button style={style} className=" border-0 bg-transparent" onClick={submit}>X</Button>
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
