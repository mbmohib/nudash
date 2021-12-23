import { Flex, Spinner } from '@chakra-ui/react';

interface PreLoaderProps {
  minHeight?: string;
  isLoading: boolean;
  children: React.ReactNode;
}

const PreLoader = ({
  isLoading,
  children,
  minHeight = '100vh',
}: PreLoaderProps) => (
  <>
    {isLoading ? (
      <Flex
        minHeight={minHeight}
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
