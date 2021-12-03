import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import { DeleteIcon, SaveIcon } from '../assets/icons';

interface HeaderProps {
  showActionButton?: boolean;
  handleSave?: () => void;
  handleDelete?: () => void;
  isSaving?: boolean;
  pageName?: string;
  hasSidebar?: boolean;
}

export default function PageHeader({
  handleSave,
  handleDelete,
  isSaving,
  pageName,
  showActionButton,
}: HeaderProps) {
  return (
    <Flex
      p="2"
      justifyContent="space-between"
      alignItems="center"
      height="80px"
      background="secondary.600"
    >
      <Box>
        <Heading as="h1" fontSize="xl" textTransform="capitalize">
          {pageName}
        </Heading>
      </Box>
      {showActionButton && (
        <Flex alignItems="center">
          <Button
            leftIcon={<SaveIcon />}
            onClick={handleSave}
            mr="2"
            isLoading={isSaving}
          >
            Save
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            variant="outline"
            mr="2"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
