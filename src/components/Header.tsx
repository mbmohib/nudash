import { Box, Heading, Icon, Flex } from '@chakra-ui/react';
import { DeleteIcon } from '../assets/icons';

export default function Header() {
  return (
    <Flex
      p="2"
      borderBottom="1px"
      borderColor="gray.500"
      justifyContent="space-between"
      alignItems="center"
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
