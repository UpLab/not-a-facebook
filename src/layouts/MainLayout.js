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
import { Link } from 'react-router-dom';
import UsersModule from '../modules/users';

const MainLayout = ({ children, history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    UsersModule.logout();
    history.replace('/login');
  };

  return (
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
    </div>
  );
};

export default MainLayout;
