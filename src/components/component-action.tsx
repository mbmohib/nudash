import { Box, Button, Flex } from '@chakra-ui/react';

import { DeleteIcon, EditIcon } from '../assets/icons';

interface ComponentActionProps {
  handleEdit?: () => void;
  handleRemove?: () => void;
  children: React.ReactNode;
}

export default function ComponentAction({
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
        p="1"
        bg="secondary.500"
        opacity="0.95"
        visibility="hidden"
        borderTopLeftRadius="base"
      >
        <Flex alignItems="center" gridGap="1">
          {handleEdit && (
            <Button variant="iconSolid" onClick={handleEdit}>
              <EditIcon width={10} />
            </Button>
          )}
          {handleRemove && (
            <Button variant="iconSolid" onClick={handleRemove}>
              <DeleteIcon width={10} />
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
