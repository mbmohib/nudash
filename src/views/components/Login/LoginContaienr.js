import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authActions } from 'store/auth';
import Login from './Login';

const LoginContainer = ({ login, jwt }) => {
  const [error, setError] = useState('');

  const handleLogin = async values => {
    const payload = {
      email_or_phone: values.emailOrPhone,
      password: values.password,
    };
    try {
      await login(payload);
    } catch (err) {
      if (
        err.message &&
        err.message.non_field_errors &&
        err.message.non_field_errors[0].includes('disabled')
      ) {
        setError('আপনার একাউন্টটি সক্রিয় নয়');
      } else {
        setError('আপনার ইমেইল বা পাসওয়ার্ডটি সঠিক নয়');
      }
    }
  };
  return (
    <>
      {jwt && <Redirect to="/dashboard" />}
      <Login handleLogin={handleLogin} error={error} />
    </>
  );
};

const mapActionsToProps = {
  login: authActions.login,
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoginContainer);
