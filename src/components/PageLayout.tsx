import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { SkeletonText } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { PageHeader } from '.';
import { PlusIcon } from '../assets/icons';

interface PageLayoutProps {
  heading: string;
  children: React.ReactNode;
  isLoading: boolean;
  pageName?: string;
  menus?: {
    path: string;
    name: string;
  }[];
  handleAdd: () => void;
}

export default function PageLayout({
  pageName,
  heading,
  isLoading,
  menus = [],
  children,
  handleAdd,
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
          <Button variant="link" onClick={handleAdd}>
            <PlusIcon />
          </Button>
        </Flex>
        {isLoading ? (
          <SkeletonText mt="4" noOfLines={4} spacing="2" />
        ) : (
          <Box as="ul" mt="28px" sx={{ listStyle: 'none' }}>
            {menus.map(menu => (
              <Box as="li" py="0.5" key={menu.name} textTransform="capitalize">
                <Link to={`/pages/${menu.path}`}>{menu.name}</Link>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box ml="200px">
        <PageHeader
          hasSidebar={true}
          isLoading={isLoading}
          pageName={pageName}
          handleSave={saveData}
          handleDelete={saveData}
        />
        {children}
      </Box>
    </Box>
  );
}
