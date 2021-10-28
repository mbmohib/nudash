import { Grid, Box, Text, Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import {
  PageIcon,
  LightIcon,
  NotificationIcon,
  SchemaIcon,
  PlusIcon,
} from '../assets/icons';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Grid
      gridTemplateColumns="60px 1fr"
      height="100vh"
      position="fixed"
      width="250px"
    >
      <Flex flexDirection="column" minHeight="100vh" bgColor="secondary500">
        <Flex height="80px" alignItems="center" justifyContent="center">
          <Text fontSize="lg">ND</Text>
        </Flex>
        <Flex
          borderTop="1px"
          borderColor="gray.500"
          flexDirection="column"
          alignItems="center"
          pt="4"
          sx={{ flexGrow: 1 }}
        >
          <Button
            as={Link}
            to="/pages"
            variant="link"
            bg="primary.light"
            color="white"
            mb="3"
          >
            <PageIcon />
          </Button>
          <Button
            as={Link}
            to="/pages"
            variant="link"
            bg="primary.light"
            color="white"
            mb="3"
          >
            <SchemaIcon />
          </Button>
        </Flex>
        <Flex flexDirection="column" alignItems="center" pb={2}>
          <Button
            as={Link}
            to="/pages"
            variant="link"
            bg="primary.light"
            color="white"
            mb="3"
          >
            <NotificationIcon />
          </Button>
          <Button
            as={Link}
            to="/pages"
            variant="link"
            bg="primary.light"
            color="white"
            mb="3"
          >
            <LightIcon />
          </Button>
        </Flex>
      </Flex>
      <Box bgColor="secondary400" px={2}>
        <Flex justifyContent="space-between" alignItems="center" height="80px">
          <Heading as="h2" size="md">
            Pages
          </Heading>
          <Button variant="link">
            <PlusIcon />
          </Button>
        </Flex>
        <Box as="ul" mt="28px" sx={{ listStyle: 'none' }}>
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
