import { Grid, Box, Text, Flex, Heading } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { PageIcon } from '../assets/icons';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { MdNotificationsNone, MdSchema } from 'react-icons/md';

export default function Sidebar() {
  return (
    <Grid gridTemplateColumns="60px 1fr" height="100vh">
      <Flex flexDirection="column" minHeight="100vh" bgColor="tertiary">
        <Box py="2">
          <Text fontSize="lg" align="center">
            ND
          </Text>
        </Box>
        <Box
          display="flex"
          borderTop="1px"
          borderColor="gray.500"
          flexDirection="column"
          alignItems="center"
          pt="2"
          sx={{ flexGrow: 1 }}
        >
          <Button
            as={Link}
            to="/pages"
            variant="link"
            bg="primary.light"
            color="white"
            mb="2"
          >
            <Icon as={PageIcon} width="24px" height="24px" />
          </Button>
          <Button
            as={Link}
            to="/pages"
            variant="link"
            bg="primary.light"
            color="white"
          >
            <Icon as={MdSchema} width="24px" height="24px" />
          </Button>
        </Box>
        <Flex flexDirection="column" alignItems="center" pb={2}>
          <Icon as={MdNotificationsNone} width="24px" height="24px" />
          <Icon as={FiUser} width="24px" height="24px" mt="2" />
        </Flex>
      </Flex>
      <Box bgColor="secondary" p={2}>
        <Flex justifyContent="space-between">
          <Heading as="h2" size="md">
            Pages
          </Heading>
          <Button variant="link">Add</Button>
        </Flex>
        <Box as="ul" mt="4" sx={{ listStyle: 'none' }}>
          <Box as="li" py="0.5">
            <Link to="/">Home Page</Link>
          </Box>
          <Box as="li" py="0.5">
            <Link to="/">Product Page</Link>
          </Box>
          <Box as="li" py="0.5">
            <Link to="/">About Page</Link>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
