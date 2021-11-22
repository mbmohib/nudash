import { Flex, Spinner } from '@chakra-ui/react';

interface PreLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const PreLoader = ({ isLoading, children }: PreLoaderProps) => (
  <>
    {isLoading ? (
      <Flex
        height="100vh"
        zIndex="docked"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="white"
          color="primary"
          size="xl"
        />
      </Flex>
    ) : (
      children
    )}
  </>
);

export default PreLoader;
