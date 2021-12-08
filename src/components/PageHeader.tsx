import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import { DeleteIcon, SaveIcon } from '../assets/icons';

interface HeaderProps {
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
}: HeaderProps) {
  return (
    <Flex
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
      <Box>
        {handleSave && (
          <Button
            leftIcon={<SaveIcon />}
            onClick={handleSave}
            isLoading={isSaving}
          >
            Save
          </Button>
        )}
        {handleDelete && (
          <Button
            leftIcon={<DeleteIcon />}
            variant="outline"
            onClick={handleDelete}
            ml="2"
          >
            Delete
          </Button>
        )}
      </Box>
    </Flex>
  );
}
