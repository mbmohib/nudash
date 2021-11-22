import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

import { PageHeader } from '.';
import { PlusIcon } from '../assets/icons';

interface PageLayoutProps {
  heading: string;
  children: React.ReactNode;
  menus: {
    link: string;
    label: string;
  }[];
}

export default function PageLayout({
  heading,
  menus,
  children,
}: PageLayoutProps) {
  const saveData = () => {
    // eslint-disable-next-line no-console
    console.log('saving');
  };

  return (
    <Box>
      <Box
        bgColor="secondary400"
        px={2}
        height="100vh"
        position="fixed"
        width="200px"
      >
        <Flex justifyContent="space-between" alignItems="center" height="80px">
          <Heading as="h2" size="md">
            {heading}
          </Heading>
          <Button variant="link">
            <PlusIcon />
          </Button>
        </Flex>
        <Box as="ul" mt="28px" sx={{ listStyle: 'none' }}>
          {menus.map(menu => (
            <Box as="li" py="0.5" key={menu.label}>
              <Link to={menu.link}>{menu.label}</Link>
            </Box>
          ))}
        </Box>
      </Box>
      <Box ml="200px">
        <PageHeader handleSave={saveData} handleDelete={saveData} />
        {children}
      </Box>
    </Box>
  );
}
