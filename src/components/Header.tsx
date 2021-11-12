import { Box, Flex, Heading } from '@chakra-ui/react';

import { DeleteIcon } from '../assets/icons';

export default function Header() {
  return (
    <Flex
      p="2"
      borderBottom="1px"
      borderColor="gray.500"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      height="80px"
      width="calc(100% - 250px)"
      zIndex="docked"
      background="secondary600"
    >
      <Box>
        <Heading size="lg">Home</Heading>
      </Box>
      <Box>
        <DeleteIcon />
      </Box>
    </Flex>
  );
}
