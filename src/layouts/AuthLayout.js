import React from 'react';
import { Container } from 'reactstrap';

const AuthLayout = ({ children }) => (
  <>
    <Container>
      {children}
    </Container>
  </>
);

export default AuthLayout;
