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

const AuthLayout = ({ children }) => (
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

export default AuthLayout;
