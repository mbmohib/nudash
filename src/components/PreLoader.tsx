import { Flex, Spinner } from '@chakra-ui/react';

interface PreLoaderProps {
  height?: string;
  isLoading: boolean;
  children: React.ReactNode;
}

const PreLoader = ({
  isLoading,
  children,
  height = '100%',
}: PreLoaderProps) => (
  <>
    {isLoading ? (
      <Flex
        height={height}
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
