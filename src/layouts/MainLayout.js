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
import { Link } from 'react-router-dom';
import routes from '../router/routes';
import useAuthHandlers from '../hooks/useAuthHandlers';
import ThemeContext from '../contexts/Theme';

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const { logout } = useAuthHandlers();

  const [theme, setTheme] = React.useState('light');

  let style;
  if (theme === 'dark') {
    style = {
      backgroundColor: '#15202b',
      color: 'white',
    };
    document.body.style.backgroundColor = 'rgb(21, 32, 43)';
  } else {
    document.body.style.backgroundColor = '#efefef';
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
              <NavLink href="#" onClick={logout}>
                Log out
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container style={style}>
        {children}
      </Container>
    </ThemeContext.Provider>
  );
};

export default MainLayout;
