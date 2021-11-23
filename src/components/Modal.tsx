import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface ModalExtendedProps {
  heading?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  showCloseBtn?: boolean;
}

export default function ModalExtended({
  heading,
  isOpen,
  onClose,
  children,
  showCloseBtn,
}: ModalExtendedProps) {
  return (
    <Modal
      autoFocus={false}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="lg"
    >
      <ModalOverlay />
      <ModalContent bgColor="secondary500">
        {heading && <ModalHeader>{heading}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody pb="4">{children}</ModalBody>
        {showCloseBtn && (
          <ModalFooter>
            <Button variant="solid" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
