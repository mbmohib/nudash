import { Button, Flex } from '@chakra-ui/react';

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
      <Button variant="link" mr="1" onClick={handleSave}>
        Save
      </Button>
      {hasData && (
        <Button variant="link" onClick={handleCancel}>
          Cancel
        </Button>
      )}
      {!hasData && (
        <Button variant="link" onClick={handleRemove}>
          Delete
        </Button>
      )}
    </Flex>
  );
}
