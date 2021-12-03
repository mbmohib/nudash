import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { SkeletonText } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

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
      bgColor="secondary.400"
      ml="1"
      height="100vh"
      position="fixed"
      width="200px"
    >
      <Flex px="2" justifyContent="space-between" alignItems="center" mt="2">
        <Heading as="h2" fontSize="xl">
          {heading}
        </Heading>
        <Button variant="icon" onClick={handleAdd} isLoading={isLoading}>
          <PlusIcon />
        </Button>
      </Flex>
      {isLoading ? (
        <SkeletonText mt="4" noOfLines={4} spacing="2" />
      ) : (
        <Box mt="28px" sx={{ listStyle: 'none' }}>
          {menus?.map(menu => (
            <NavLink activeClassName="active" to={`/pages/${menu.path}`}>
              <Box
                as="span"
                display="block"
                py="0.5"
                px="2"
                key={menu.id}
                sx={{
                  '.active &': {
                    bg: 'secondary.600',
                  },
                }}
                textTransform="capitalize"
              >
                {menu.name}
              </Box>
            </NavLink>
          ))}
        </Box>
      )}
    </Box>
  );
}
