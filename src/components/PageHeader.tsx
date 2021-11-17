import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import { DeleteIcon } from '../assets/icons';

interface HeaderProps {
  save: () => void;
}

export default function Header({ save }: HeaderProps) {
  return (
    <Flex
      p="2"
      borderBottom="1px"
      borderColor="gray.500"
      justifyContent="space-between"
      alignItems="center"
      height="80px"
      background="secondary600"
      width="calc(100% - 250px)"
      zIndex="docked"
      position="fixed"
    >
      <Box>
        <Heading size="lg">Home</Heading>
      </Box>
      <Flex alignItems="center">
        <Button onClick={save} mr="2">
          Save
        </Button>
        <DeleteIcon />
      </Flex>
    </Flex>
  );
}
