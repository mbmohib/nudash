import React from 'react';
import { Form, withFormik } from 'formik';
import { TextField } from '@material-ui/core';
import * as yup from 'yup';

import { Button, Typography } from 'views/ui';

const Login = ({ values, error, handleChange, handleBlur }) => {
  return (
    <Form>
      <TextField
        fullWidth
        label="Email"
        name="emailOrPhone"
        value={values.emailOrPhone}
        margin="normal"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={values.password}
        margin="normal"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        justify="flex-start"
        mt={2}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: () => ({
    emailOrPhone: '',
    password: '',
  }),
  validationSchema: yup.object().shape({
    emailOrPhone: yup.string().required(),
    password: yup.mixed().required(),
  }),
  handleSubmit(
    values,
    {
      props: { handleLogin },
    }
  ) {
    const { emailOrPhone } = values;

    if (emailOrPhone.length === 11) {
      if (
        emailOrPhone[0] === '0' &&
        emailOrPhone[1] === '1' &&
        !emailOrPhone.includes('@')
      ) {
        values.emailOrPhone = `+88${emailOrPhone}`;
      }
    }
    handleLogin(values);
  },
})(Login);

export default LoginForm;
