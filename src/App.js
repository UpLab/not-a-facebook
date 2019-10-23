import React from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FeedPage from './pages/FeedPage';
import LoginForm from './pages/LoginForm';

const App = () => (
  <Container>
    <LoginForm />
    <FeedPage />
  </Container>
);

export default App;
