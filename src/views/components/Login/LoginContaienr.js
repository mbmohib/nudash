import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authActions } from 'store/auth';
import Login from './Login';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const jwt = useSelector(({ auth }) => auth.jwt);
  const { error, loading } = useSelector(({ ui }) => ({
    error: ui.error,
    loading: ui.loading,
  }));
  // const [error, setError] = useState('');
  const { login } = authActions;

  const handleLogin = async values => {
    try {
      dispatch(login(values));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {jwt && <Redirect to="/dashboard" />}
      <Login
        loading={loading.auth}
        handleLogin={handleLogin}
        loginError={error['auth'] && 'Email or Password not matched'}
      />
    </>
  );
};

export default LoginContainer;
