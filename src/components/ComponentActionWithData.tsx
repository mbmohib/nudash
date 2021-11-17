import { Box, Button, Flex } from '@chakra-ui/react';

import { DeleteIcon } from '../assets/icons';

interface ComponentActionProps {
  handleEdit: () => void;
  handleDelete: () => void;
  children: React.ReactNode;
}

export default function ComponentActionWithData({
  handleEdit,
  handleDelete,
  children,
}: ComponentActionProps) {
  return (
    <Box
      position="relative"
      sx={{
        ':hover .filed-action-btn': {
          display: 'block',
        },
      }}
    >
      {children}
      <Box
        className="filed-action-btn"
        position="absolute"
        right="-10px"
        top="-15px"
        display="none"
      >
        <Flex>
          <Button variant="icon" size="xs" onClick={handleEdit}>
            <DeleteIcon width="10px" />
          </Button>
          <Button variant="icon" size="xs" onClick={handleDelete}>
            <DeleteIcon width="10px" />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
