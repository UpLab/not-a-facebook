import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import UsersModel from '../modules/users';

const MainLayout = ({ children, history }) => {
  const currentUser = UsersModel.me();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    UsersModel.logout();
    history.replace('/login');
  };

  return (
    <div>

      {!currentUser ? <Redirect to="/login" /> : (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">NAF</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    User
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/profile">
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
          <Container>
            {children}
          </Container>
        </div>)}
    </div>
  );
};

export default MainLayout;
