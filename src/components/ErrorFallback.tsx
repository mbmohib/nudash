import { Box, Button, Flex, Heading } from '@chakra-ui/react';

interface HandleErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function HandleError({ resetErrorBoundary }: HandleErrorProps) {
  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh">
      <Box>
        <Heading size="lg" mb="2">
          Something went wrong
        </Heading>
        <Button mt="2" variant="solid" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Box>
    </Flex>
  );
}
