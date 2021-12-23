import { Container, Flex, Heading, Text } from '@chakra-ui/react';

export default function NotFoundPage() {
  return (
    <Container>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="calc(100vh - 72px)"
      >
        <Heading role="heading" mb="2">
          404
        </Heading>

        <Text fontSize="xl">404! Page not found!</Text>
      </Flex>
    </Container>
  );
}
