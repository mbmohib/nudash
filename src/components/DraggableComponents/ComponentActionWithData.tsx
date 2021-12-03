import { Box, Button, Flex } from '@chakra-ui/react';

import { DeleteIcon } from '../../assets/icons';

interface ComponentActionProps {
  handleEdit: () => void;
  handleRemove: () => void;
  children: React.ReactNode;
}

export default function ComponentActionWithData({
  handleEdit,
  handleRemove,
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
            <DeleteIcon width={10} />
          </Button>
          <Button variant="icon" size="xs" onClick={handleRemove}>
            <DeleteIcon width={10} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
