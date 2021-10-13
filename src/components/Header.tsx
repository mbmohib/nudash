import { Box, Heading, Icon, Flex } from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';

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
        <Icon as={FiTrash} width="24px" height="24px" mt="2" />
      </Box>
    </Flex>
  );
}
