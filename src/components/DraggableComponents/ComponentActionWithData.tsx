import { Box, Button, Flex } from '@chakra-ui/react';

import { DeleteIcon, EditIcon } from '../../assets/icons';

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
    <Flex
      alignItems="center"
      position="relative"
      sx={{
        ':hover .filed-action-btn': {
          visibility: 'visible',
        },
      }}
    >
      {children}
      <Box
        className="filed-action-btn"
        alignSelf="flex-end"
        visibility="hidden"
      >
        <Flex alignItems="center" gridGap="1" ml="1">
          <Button variant="iconSolid" onClick={handleEdit}>
            <EditIcon width={10} />
          </Button>
          <Button variant="iconSolid" onClick={handleRemove}>
            <DeleteIcon width={10} />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
