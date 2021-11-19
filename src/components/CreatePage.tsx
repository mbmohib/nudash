import { Box, Input } from '@chakra-ui/react';

import { Modal } from '.';

interface CreatePageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePage({ isOpen, onClose }: CreatePageProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box>
        <Input type="text" />
      </Box>
    </Modal>
  );
}
