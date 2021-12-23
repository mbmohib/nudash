import { Button, Flex, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { DashboardIcon, ImageIcon, PageIcon, SiteIcon } from '../assets/icons';

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
        <Tooltip label="Dashboard">
          <Button
            as={Link}
            to="/"
            variant="icon"
            mb="1"
            data-testid="dashboard-link"
          >
            <DashboardIcon />
          </Button>
        </Tooltip>
        <Tooltip label="Site">
          <Button
            as={Link}
            to="/site"
            variant="icon"
            mb="1"
            data-testid="site-link"
          >
            <SiteIcon />
          </Button>
        </Tooltip>
        <Tooltip label="Pages">
          <Button
            as={Link}
            to="/pages"
            variant="icon"
            mb="1"
            data-testid="page-link"
          >
            <PageIcon />
          </Button>
        </Tooltip>
        <Tooltip label="Gallery">
          <Button
            as={Link}
            to="/gallery"
            variant="icon"
            mb="1"
            data-testid="gallery-link"
          >
            <ImageIcon width={18} height={20} />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
