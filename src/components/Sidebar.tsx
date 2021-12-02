import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

import { DashboardIcon, PageIcon, SiteIcon } from '../assets/icons';

export default function Sidebar() {
  return (
    <Flex
      flexDirection="column"
      height="100vh"
      position="fixed"
      bgColor="secondary500"
      width="60px"
    >
      <Flex
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
          role="dashboard"
        >
          <DashboardIcon />
        </Button>
        <Button
          as={Link}
          to="/site"
          variant="link"
          bg="primary.light"
          color="white"
          mb="3"
          role="site"
        >
          <SiteIcon />
        </Button>
        <Button
          as={Link}
          to="/pages"
          variant="link"
          bg="primary.light"
          color="white"
          mb="3"
          role="pages"
        >
          <PageIcon />
        </Button>
      </Flex>
    </Flex>
  );
}
