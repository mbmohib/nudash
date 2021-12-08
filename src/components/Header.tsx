import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { LightIcon, NotificationIcon } from '../assets/icons';
import logo from '../assets/images/logo.png';

export default function Header() {
  return (
    <Box
      height="72px"
      position="fixed"
      width="100%"
      zIndex="docked"
      top="0"
      bg="secondary.600"
    >
      <Flex
        bg="secondary.500"
        alignItems="center"
        justifyContent="space-between"
        px="2"
        height="64px"
      >
        <Image src={logo} alt="Logo" />
        <Flex alignItems="center">
          <Button
            as={Link}
            to="/pages"
            variant="link"
            bg="primary.light"
            color="white"
          >
            <NotificationIcon />
          </Button>
          <Button
            as={Link}
            to="/pages"
            variant="link"
            bg="primary.light"
            color="white"
          >
            <LightIcon />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
