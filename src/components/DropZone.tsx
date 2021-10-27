import { useDrop } from 'react-dnd';
import { ItemTypes, FieldType } from '../config';
import {
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from '@chakra-ui/react';
import { useSelector } from '../hooks/useRedux';
import { DraggableItem } from '../types';

interface DropZoneProps {
  id: string;
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
  const placeholder = isActive ? `Release to drop` : `Drop a column block here`;

  return (
    <Flex
      ref={drop}
      role={'DropZone'}
      width="80%"
      mx="auto"
      minHeight="100px"
      bgColor={isActive ? 'gray.400' : 'transparent'}
      justifyContent="center"
      alignItems="center"
      rounded="base"
      border="1px dashed #2D2D6A"
      p="2"
    >
      {!fieldType && placeholder}
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
