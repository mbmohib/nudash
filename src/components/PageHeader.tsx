import { Box, Button, Flex, Heading, Skeleton } from '@chakra-ui/react';

import { DeleteIcon } from '../assets/icons';

interface HeaderProps {
  showActionButton?: boolean;
  handleSave?: () => void;
  handleDelete?: () => void;
  isLoading?: boolean;
  pageName?: string;
  hasSidebar?: boolean;
}

export default function PageHeader({
  handleSave,
  handleDelete,
  isLoading,
  pageName,
  hasSidebar,
  showActionButton,
}: HeaderProps) {
  return (
    <Flex
      p="2"
      borderBottom="1px"
      borderColor="gray.500"
      justifyContent="space-between"
      alignItems="center"
      height="80px"
      background="secondary600"
      width={`calc(100% - ${hasSidebar ? '250px' : '60px'})`}
      zIndex="docked"
      position="fixed"
    >
      <Box>
        <Skeleton isLoaded={!isLoading}>
          <Heading size="lg" textTransform="capitalize">
            {pageName}
          </Heading>
        </Skeleton>
      </Box>
      {showActionButton && (
        <Skeleton isLoaded={!isLoading}>
          <Flex alignItems="center">
            <Button onClick={handleSave} mr="2">
              Save
            </Button>
            <Button variant="icon" mr="2" onClick={handleDelete}>
              <DeleteIcon />
            </Button>
          </Flex>
        </Skeleton>
      )}
    </Flex>
  );
}
