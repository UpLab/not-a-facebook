import React, { useState } from 'react';
import {
  Card, CardBody, CardText, CardTitle, Media,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import UsersModel from '../modules/users';
import routes from '../routes';
// eslint-disable-next-line no-unused-vars
const Post = ({ handleRemovePost, body, ownerId }) => {
  const me = UsersModel.me();
  const owner = UsersModel.getUser(ownerId);
  const { avatar, firstName, lastName } = owner.profile;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="post-form">
      <Card>
        <span className="d-flex mb-0">
          <CardBody className="pb-2 pl-2 pt-2">
            <span className="d-flex">
              <Media
                className="icon"
                src={avatar}
                alt="pic"
              />
              <Link to={`${routes.profile}/${owner.username}`} className="text-dark mt-2 ml-2">
                {` ${firstName}`} {lastName}
              </Link>
            </span>
          </CardBody>
          <CardTitle>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="text-dark bg-white border border-white 2rem mt-0 pt-0 pr-2 btn-outline-light">
                ...
              </DropdownToggle>
              <DropdownMenu>
                {
                  me.id === ownerId
                    ? <DropdownItem className="drop-item" onClick={handleRemovePost}>Remove</DropdownItem>
                    : null
                }
                <DropdownItem className="drop-item">Edit</DropdownItem>
                <DropdownItem className="drop-item">Save</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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

const Feed = ({ posts, handleRemovePost }) => (
  <div>
    {posts.map((post) => (
      <Post
        key={post.id}
        handleRemovePost={() => handleRemovePost({ id: post.id })}
        {...post}
      />
    ))}
  </div>
);

export default Feed;
