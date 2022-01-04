import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { LightIcon, NotificationIcon } from '../assets/icons';
import logo from '../assets/images/logo.svg';
import userImage from '../assets/images/user-image.png';
import { useLogout } from '../services/auth.api';

export default function Header() {
  const logout = useLogout();

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
        <Image width="160px" src={logo} alt="Logo" />
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
          <Menu>
            <MenuButton ml="2">
              <Image width="40px" src={userImage} alt="user image profile" />
            </MenuButton>

            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={() => logout.mutate()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
