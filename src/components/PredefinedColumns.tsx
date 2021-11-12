import { Button } from '@chakra-ui/button';
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface PredefinedColumnsProps {
  isOpen: boolean;
  onClose: () => void;
  handleColumnLayout: (count: number) => void;
}

interface ColumnProps {
  count: number;
  handleColumn: (count: number) => void;
}

const columnCount = [1, 2, 3, 4, 6];

function Column({ count, handleColumn }: ColumnProps) {
  const columns = Array(...Array(count)).map((_, i) => i);

  return (
    <Flex
      border="1px"
      borderColor="secondary100"
      justifyContent="center"
      cursor="pointer"
      onClick={() => handleColumn(count)}
      width="100%"
    >
      {columns.map((_, index) => (
        <Box
          width="100%"
          key={index}
          height="50px"
          bgColor="secondary400"
          m="0.5"
        />
      ))}
    </Flex>
  );
}

export default function PredefinedColumns({
  isOpen,
  onClose,
  handleColumnLayout,
}: PredefinedColumnsProps) {
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
        <ModalHeader>Select Column</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexWrap="wrap" gridGap="2">
            {columnCount.map((column: number) => (
              <Column
                key={column}
                count={column}
                handleColumn={(count: number) => handleColumnLayout(count)}
              />
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="solid" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
