import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useSelector } from '../hooks';
import { useLogin } from '../services/auth.api';
import { Location } from '../types';

const schema = yup
  .object({
    email: yup.string().email().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  })
  .required();

export default function LoginPage() {
  const login = useLogin();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector(state => state.auth);
  const location = useLocation() as Location;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    login.mutate({
      data,
    });
  };

  useEffect(() => {
    if (isAuthorized) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthorized]);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email} mb="2">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" placeholder="email" {...register('email')} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} mb="2">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="password"
            {...register('password')}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button isFullWidth variant="solid" mt="3" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
}
