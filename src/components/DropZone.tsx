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
interface DropZoneProps {
  id: string;
}

interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: any;
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
  const placeholder = isActive ? `Release to drop` : `Drag a box here`;

  return (
    <>
      <Flex
        ref={drop}
        role={'DropZone'}
        width="100%"
        minHeight="100px"
        bgColor={isActive ? 'gray.400' : 'gray.600'}
        justifyContent="center"
        alignItems="center"
        rounded="base"
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
    </>
  );
}
