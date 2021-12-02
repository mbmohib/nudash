import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import { DeleteIcon } from '../assets/icons';

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
      background="secondary600"
    >
      <Box>
        <Heading size="lg" textTransform="capitalize">
          {pageName}
        </Heading>
      </Box>
      {showActionButton && (
        <Flex alignItems="center">
          <Button onClick={handleSave} mr="2" isLoading={isSaving}>
            Save
          </Button>
          <Button variant="icon" mr="2" onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
