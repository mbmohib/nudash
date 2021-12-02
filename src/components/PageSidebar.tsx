import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { SkeletonText } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { PlusIcon } from '../assets/icons';
import { Pages } from '../types';

interface PageSidebarProps {
  heading: string;
  isLoading: boolean;
  handleAdd: () => void;
  menus?: Pages[];
}

export default function PageSidebar({
  heading,
  isLoading,
  handleAdd,
  menus = [],
}: PageSidebarProps) {
  return (
    <Box
      bgColor="secondary400"
      px={2}
      ml="1"
      height="100vh"
      position="fixed"
      width="200px"
    >
      <Flex justifyContent="space-between" alignItems="center" height="80px">
        <Heading as="h2" fontSize="xl">
          {heading}
        </Heading>
        <Button variant="link" onClick={handleAdd} isLoading={isLoading}>
          <PlusIcon />
        </Button>
      </Flex>
      {isLoading ? (
        <SkeletonText mt="4" noOfLines={4} spacing="2" />
      ) : (
        <Box as="ul" mt="28px" sx={{ listStyle: 'none' }}>
          {menus?.map(menu => (
            <Box as="li" py="0.5" key={menu.id} textTransform="capitalize">
              <Link to={`/pages/${menu.path}`}>{menu.name}</Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
