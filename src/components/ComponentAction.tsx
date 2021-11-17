import { Button, Flex } from '@chakra-ui/react';

interface ComponentActionProps {
  handleSave: () => void;
  handleCancel?: () => void;
  handleDelete?: () => void;
  handleRemove?: () => void;
  hasData?: boolean;
}

export default function ComponentAction({
  handleSave,
  handleDelete,
  handleCancel,
  handleRemove,
  hasData,
}: ComponentActionProps) {
  return (
    <Flex justifyContent="flex-end" mt="1">
      <Button variant="link" mr="1" onClick={handleSave}>
        Save
      </Button>
      {hasData && (
        <Button variant="link" onClick={handleCancel}>
          Cancel
        </Button>
      )}
      {!hasData && (
        <Button variant="link" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </Flex>
  );
}
