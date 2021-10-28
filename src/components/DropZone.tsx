import { useDrop } from 'react-dnd';
import { ItemTypes, FieldType } from '../config';
import {
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { useSelector } from '../hooks/useRedux';
import { DraggableItem } from '../types';

interface DropZoneProps {
  id: string;
}

interface DropZonePlaceholderProps {
  isActive: boolean;
}

function DropZonePlaceholder({ isActive }: DropZonePlaceholderProps) {
  return (
    <Box
      border="1px dashed"
      borderColor="secondary100"
      width="80%"
      mx="auto"
      height="80px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text>{isActive ? `Release to drop` : `Drop a column block here`}</Text>
    </Box>
  );
}

export default function DropZone({ id }: DropZoneProps) {
  const { dropZones } = useSelector(state => state.section);
  const dropZone = dropZones.find(item => item.id === id) as DraggableItem;

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.Field,
    drop: () => ({ id }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const { fieldType, data } = dropZone || {};

  const isActive = canDrop && isOver;

  return (
    <Flex
      ref={drop}
      role={'DropZone'}
      minHeight="100px"
      width="100%"
      justifyContent="center"
      alignItems="center"
      rounded="base"
      p="2"
    >
      {!fieldType && <DropZonePlaceholder isActive={isActive} />}
      {fieldType === FieldType.Text && (
        <FormControl id="text">
          <FormLabel>Single line Text</FormLabel>
          <Input type="text" />
        </FormControl>
      )}
      {fieldType === FieldType.MultilineText && (
        <FormControl id="text">
          <FormLabel>Multi line Text</FormLabel>
          <Textarea />
        </FormControl>
      )}
    </Flex>
  );
}
