import React, { useState, useCallback } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
  NavItem,
  NavLink,
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
          <Navbar className="nav-bar mb-2" dark expand="md">
            <NavbarBrand tag="span">
              <Link to={routes.home}>
                NAF
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} className="m-2" />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag="span">
                    <Link to={routes.home}>
                      Feed
                    </Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag="span">
                    <Link to={routes.profile}>
                      Profile
                    </Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={handleLogout}>
                    Log out
                  </NavLink>
                </NavItem>
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
