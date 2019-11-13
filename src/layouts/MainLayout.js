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
import Theme from '../modules/theme';

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const { logout } = useAuthHandlers();

  const [theme, setTheme] = React.useState(Theme.theme);

  const style = Theme.getStyle(theme);

  if (theme === 'dark') {
    Theme.setTheme(theme);
    Theme.setDarkBackground();
  } else {
    Theme.setTheme(theme);
    Theme.setLightBackground();
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
