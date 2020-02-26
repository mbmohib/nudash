import React from 'react';
import { Form, withFormik } from 'formik';
import { TextField } from '@material-ui/core';
import * as yup from 'yup';

import { Button, Wrapper, FieldErrorMsg } from 'views/ui';

const Login = ({
  values,
  errors,
  touched,
  loginError,
  handleChange,
  handleBlur,
  loading,
}) => {
  return (
    <Wrapper textAlign="center">
      <Form>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={values.email}
          margin="normal"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email && touched.email}
        />
        <FieldErrorMsg error={errors.email} isTouched={touched.email} />
        <TextField
          error={errors.password && touched.password}
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={values.password}
          margin="normal"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FieldErrorMsg error={errors.password} isTouched={touched.password} />
        <FieldErrorMsg error={loginError} isTouched={!!loginError} />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          justify="flex-start"
          mt={2}
          type="submit"
          disabled={loading}
          loading={loading}
        >
          Login
        </Button>
      </Form>
    </Wrapper>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Please provide a valid email')
      .required('Please enter your email'),
    password: yup.mixed().required('Please enter your password'),
  }),
  handleSubmit(values, { props: { handleLogin } }) {
    handleLogin(values);
  },
})(Login);

export default LoginForm;
