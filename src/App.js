import React, { Component } from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FeedPage from './pages/FeedPage';
import LoginForm from './pages/LoginForm';
import UsersModel from './modules/users';

export const UserContex = React.createContext();

class App extends Component {
  state = {
    currentUser: UsersModel.currentUser,
  };

  setCurrentUser = (data) => {
    this.setState({ currentUser: data });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <Container>
        <LoginForm setCurrentUser={this.setCurrentUser} />
        <FeedPage currentUser={currentUser} />
      </Container>
    );
  }
}

export default App;
