import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import loginBg from '../assets/images/login-bg.png';
import logoinBottomBg from '../assets/images/login-bottom-bg.png';
import logo from '../assets/images/logo.svg';
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
    <Flex
      height="100vh"
      alignItems="center"
      width="full"
      bgColor="secondary.600"
      position="relative"
    >
      <Box
        backgroundImage={logoinBottomBg}
        position="absolute"
        bottom="0"
        left="0"
        width="full"
        height="80vh"
        backgroundSize="100% 100%"
        zIndex="docked"
      />
      <Container maxW="6xl">
        <Grid gridTemplateColumns="1fr 1fr" gap="6">
          <Flex
            flexDirection="column"
            alignItems="center"
            pr="8"
            zIndex="dropdown"
          >
            <Text
              textAlign="center"
              mb="2"
              textColor="gray.500"
              fontSize="28px"
            >
              Welcome to
            </Text>
            <Image width="350px" src={logo} alt="logo" mb="4" />
            <Image src={loginBg} alt="" />
          </Flex>
          <Box
            bgColor="secondary.500"
            p="6"
            borderRadius="md"
            pt="7"
            zIndex="dropdown"
            boxShadow="0px 20px 60px rgba(0, 0, 0, 0.2)"
          >
            <Heading fontSize="xl" mb="6">
              Here you can login
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.email} mb="4">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" placeholder="email" {...register('email')} />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password} mb="4">
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

              <Button
                isFullWidth
                variant="solid"
                mt="3"
                type="submit"
                isLoading={login.isLoading}
              >
                Login
              </Button>
            </form>
          </Box>
        </Grid>
      </Container>
    </Flex>
  );
}
