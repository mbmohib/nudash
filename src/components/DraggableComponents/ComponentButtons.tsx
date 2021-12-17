import { Button, Flex } from '@chakra-ui/react';

import { DeleteIcon, SaveIcon } from '../../assets/icons';

interface ComponentButtonsProps {
  handleSave?: () => void;
  handleCancel?: () => void;
  handleRemove: () => void;
  hasData?: boolean;
}

export default function ComponentButtons({
  handleSave,
  handleCancel,
  handleRemove,
  hasData,
}: ComponentButtonsProps) {
  return (
    <Flex justifyContent="flex-end" mt="1">
      <Button
        leftIcon={<SaveIcon width={12} height={13} />}
        variant="ghost"
        onClick={handleSave}
        type="submit"
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
