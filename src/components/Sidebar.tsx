import { Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { DashboardIcon, PageIcon, SiteIcon } from '../assets/icons';

export default function Sidebar() {
  return (
    <Flex
      flexDirection="column"
      height="100vh"
      position="fixed"
      bgColor="secondary.500"
      width="60px"
    >
      <Flex
        mt="2"
        flexDirection="column"
        alignItems="center"
        sx={{ flexGrow: 1 }}
      >
        <Button as={Link} to="/" variant="icon" mb="1" role="dashboard">
          <DashboardIcon />
        </Button>
        <Button as={Link} to="/site" variant="icon" mb="1" role="site">
          <SiteIcon />
        </Button>
        <Button as={Link} to="/pages" variant="icon" mb="1" role="pages">
          <PageIcon />
        </Button>
      </Flex>
    </Flex>
  );
}
