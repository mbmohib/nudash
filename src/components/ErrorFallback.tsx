import { Box, Button, Flex, Heading } from '@chakra-ui/react';

interface HandleErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function HandleError({
  error,
  resetErrorBoundary,
}: HandleErrorProps) {
  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh">
      <Box>
        <Heading size="lg" mb="2">
          Something went wrong
        </Heading>
        <pre>{error.message}</pre>
        <Button mt="2" variant="solid" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Box>
    </Flex>
  );
}
