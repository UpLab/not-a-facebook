import React, { useState, useCallback } from 'react';
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
import routes from '../routes';
import ThemeContext from '../contexts/Theme';

const MainLayout = ({ children, history }) => {
  const currentUser = UsersModel.me();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleLogout = useCallback(() => {
    UsersModel.logout();
    history.replace(routes.login);
  }, [history]);

  const [theme, setTheme] = React.useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {!currentUser ? <Redirect to={routes.login} /> : (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand>
              <Link to={routes.home}>
                NAF
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    User
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to={routes.profile}>
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to={routes.home}>
                        Feed
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
    </ThemeContext.Provider>
  );
};

export default MainLayout;
