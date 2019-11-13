import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  NavItem,
  NavLink,
} from 'reactstrap';
import Theme from '../modules/theme';


const AuthLayout = ({ children }) => {
  Theme.setLightBackground();

  return (
    <>
      <Navbar className="nav-bar mb-2" dark expand="md">
        <NavbarBrand href="#">
          NAF
        </NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#">
                About us
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                Why NAF?
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
        {children}
      </Container>
    </>
  );
};
export default AuthLayout;
