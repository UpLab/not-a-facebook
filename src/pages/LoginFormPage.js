import React from 'react';
import {
  Form, Input, Button, Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLoginForm from '../hooks/useLoginForm';
import routes from '../router/routes';

const LoginForm = (props) => {
  const { isLogin, history } = props;
  const onSuccess = React.useCallback(({ user }) => {
    toast.success(`Welcome ${user.username}!`);
    history.push(routes.home);
  }, [history]);
  const [state, handleSubmit, handleChange] = useLoginForm({ isLogin, onSuccess });

  const {
    username, password, errLogin,
  } = state;

  return (
    <div>
      <h2 className="login">{isLogin ? 'Login' : 'Create an account'}</h2>
      <Form onSubmit={handleSubmit}>
        <div className="login-form">
          <Alert color="danger" isOpen={errLogin.active}>
            {errLogin.msg}
          </Alert>
          <Input
            className="login-input"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            // pattern="^[a-z0-9_-]{3,15}$"
            onChange={handleChange}
          />
          <Input
            className="login-input"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            // title="Для прикладу: 1Aaaaaaa"
            // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            onChange={handleChange}
          />
          <Button
            className="button"
            type="submit"
            disabled={!(username && password)}
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
          <div>
            {
              isLogin ? (
                <div>
                    Don&apos;t have an account? <Link to={routes.signUp}>Sign up</Link>
                  <br />
                    Forgot password? <Link to={routes.forgotPassword}>Reset password</Link>
                </div>
              ) : (
                <div>
                      Already have an account? <Link to={routes.login}>Login</Link>
                </div>
              )
            }
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
