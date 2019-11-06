import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/react-hooks';
import './modules/uploader';
import Router from './router';
import ApolloClient from './modules/apollo';

const App = () => (
  <ApolloProvider client={ApolloClient}>
    <Router />
    <ToastContainer />
  </ApolloProvider>
);

export default App;
