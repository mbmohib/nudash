import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

import {
  LightIcon,
  NotificationIcon,
  PageIcon,
  SchemaIcon,
} from '../assets/icons';

export default function Sidebar() {
  return (
    <Flex
      flexDirection="column"
      height="100vh"
      position="fixed"
      bgColor="secondary500"
    >
      <Flex height="80px" alignItems="center" justifyContent="center">
        <Text fontSize="lg">ND</Text>
      </Flex>
      <Flex
        borderTop="1px"
        borderColor="gray.500"
        flexDirection="column"
        alignItems="center"
        pt="4"
        sx={{ flexGrow: 1 }}
      >
        <Button
          as={Link}
          to="/"
          variant="link"
          bg="primary.light"
          color="white"
          mb="3"
        >
          DS
        </Button>
        <Button
          as={Link}
          to="/site"
          variant="link"
          bg="primary.light"
          color="white"
          mb="3"
        >
          Site
        </Button>
        <Button
          as={Link}
          to="/pages"
          variant="link"
          bg="primary.light"
          color="white"
          mb="3"
        >
          <PageIcon />
        </Button>
        <Button
          as={Link}
          to="/pages"
          variant="link"
          bg="primary.light"
          color="white"
          mb="3"
        >
          <SchemaIcon />
        </Button>
      </Flex>
      <Flex flexDirection="column" alignItems="center" pb={2}>
        <Button
          as={Link}
          to="/pages"
          variant="link"
          bg="primary.light"
          color="white"
          mb="3"
        >
          <NotificationIcon />
        </Button>
        <Button
          as={Link}
          to="/pages"
          variant="link"
          bg="primary.light"
          color="white"
          mb="3"
        >
          <LightIcon />
        </Button>
      </Flex>
    </Flex>
  );
}
