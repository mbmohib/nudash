import { Button, Flex } from '@chakra-ui/react';

import { DeleteIcon, SaveIcon } from '../../assets/icons';

interface ComponentActionProps {
  handleSave: () => void;
  handleCancel?: () => void;
  handleRemove: () => void;
  hasData?: boolean;
}

export default function ComponentAction({
  handleSave,
  handleCancel,
  handleRemove,
  hasData,
}: ComponentActionProps) {
  return (
    <Flex justifyContent="flex-end" mt="1">
      <Button
        leftIcon={<SaveIcon width={12} height={13} />}
        variant="ghost"
        onClick={handleSave}
      >
        Save
      </Button>
      {hasData && (
        <Button
          leftIcon={<SaveIcon width={12} height={13} />}
          variant="ghost"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}
      {!hasData && (
        <Button
          leftIcon={<DeleteIcon width={12} height={13} />}
          variant="ghost"
          onClick={handleRemove}
        >
          Delete
        </Button>
      )}
    </Flex>
  );
}
