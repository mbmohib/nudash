import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
} from '@chakra-ui/react';

interface PredefinedColumnsProps {
  sectionId: number;
  isOpen: boolean;
  onClose: () => void;
  handleColumnLayout: (count: number, sectionId: number) => void;
}

interface ColumnProps {
  count: number;
  handleColumn: (count: number) => void;
}

enum ColumnCount {
  oneColumn = 1,
  twoColumns = 2,
  threeColumns = 3,
  fourColumns = 4,
  sixColumns = 6,
}

function Column({ count, handleColumn }: ColumnProps) {
  const columns = Array(...Array(count)).map((_, i) => i);

  return (
    <Flex
      border="1px"
      borderColor="primary"
      justifyContent="center"
      cursor="pointer"
      onClick={() => handleColumn(count)}
    >
      {columns.map((_, index) => (
        <Box
          key={index}
          width="50px"
          height="50px"
          bgColor="tertiary"
          m="0.5"
        />
      ))}
    </Flex>
  );
}

export default function PredefinedColumns({
  sectionId,
  isOpen,
  onClose,
  handleColumnLayout,
}: PredefinedColumnsProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
      <ModalOverlay />
      <ModalContent bgColor="secondary">
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexWrap="wrap" gridGap="2">
            <Column
              count={ColumnCount.oneColumn}
              handleColumn={(count: number) =>
                handleColumnLayout(count, sectionId)
              }
            />
            <Column
              count={ColumnCount.twoColumns}
              handleColumn={(count: number) =>
                handleColumnLayout(count, sectionId)
              }
            />
            <Column
              count={ColumnCount.threeColumns}
              handleColumn={(count: number) =>
                handleColumnLayout(count, sectionId)
              }
            />
            <Column
              count={ColumnCount.fourColumns}
              handleColumn={(count: number) =>
                handleColumnLayout(count, sectionId)
              }
            />
            <Column
              count={ColumnCount.sixColumns}
              handleColumn={(count: number) =>
                handleColumnLayout(count, sectionId)
              }
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button bgColor="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
