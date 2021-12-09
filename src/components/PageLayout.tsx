import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { SkeletonText } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { PlusIcon } from '../assets/icons';
import { Pages } from '../types';

interface PageLayoutProps {
  children: React.ReactNode;
  heading: string;
  isLoading: boolean;
  handleAdd?: () => void;
  menus?: Pages[];
}

export default function PageLayout({
  children,
  heading,
  isLoading,
  handleAdd,
  menus = [],
}: PageLayoutProps) {
  return (
    <>
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
          {handleAdd && (
            <Button variant="icon" onClick={handleAdd} isLoading={isLoading}>
              <PlusIcon />
            </Button>
          )}
        </Flex>
        {isLoading ? (
          <SkeletonText px="2" mt="4" noOfLines={4} spacing="2" />
        ) : (
          <Box mt="28px" sx={{ listStyle: 'none' }}>
            {menus?.map(menu => (
              <NavLink
                key={menu.id}
                activeClassName="active"
                to={`${menu.path}`}
              >
                <Box
                  as="span"
                  display="block"
                  py="1"
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
      <Box ml="208px" bg="secondary.600">
        {children}
      </Box>
    </>
  );
}
