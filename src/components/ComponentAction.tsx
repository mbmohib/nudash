import { Button, Flex } from '@chakra-ui/react';

interface ComponentActionProps {
  handleSave: () => void;
}

export default function ComponentAction({ handleSave }: ComponentActionProps) {
  return (
    <Flex justifyContent="flex-end" mt="1">
      <Button variant="link" mr="1" onClick={handleSave}>
        Save
      </Button>
      <Button variant="link">Cancel</Button>
    </Flex>
  );
}
