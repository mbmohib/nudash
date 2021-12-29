import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

interface ModalExtendedProps extends ModalProps {
  heading?: string;
  showCloseBtn?: boolean;
}

export default function ModalExtended({
  heading,
  isOpen,
  onClose,
  children,
  showCloseBtn,
  size = 'lg',
}: ModalExtendedProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={size}>
      <ModalOverlay />
      <ModalContent bgColor="secondary.500">
        {heading && (
          <ModalHeader pt="3" pb="1">
            {heading}
          </ModalHeader>
        )}
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
