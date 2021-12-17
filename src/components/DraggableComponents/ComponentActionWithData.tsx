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
      mb="2"
      alignItems="center"
      position="relative"
      width="100%"
      sx={{
        ':hover .filled-action-btn': {
          visibility: 'visible',
        },
      }}
    >
      {children}
      <Box
        position="absolute"
        className="filled-action-btn"
        alignSelf="flex-end"
        right="0"
        bottom="0"
        bg="secondary.500"
        pl="1"
        opacity="0.95"
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
