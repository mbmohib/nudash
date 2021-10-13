import { useDrop } from 'react-dnd';
import { ItemTypes } from '../types/ItemTypes';
import {
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Button,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FieldType } from '../types/FieldType';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';

export enum HandleRowType {
  Add = 'add',
  Delete = 'delete',
}
interface DropZoneProps {
  fieldType: FieldType | null;
  id: number;
  handleRow: (type: HandleRowType, id: number) => void;
}

export default function DropZone({ fieldType, handleRow, id }: DropZoneProps) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.Field,
    drop: () => ({ id }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  const placeholder = isActive ? `Release to drop` : `Drag a box here ${id}`;

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <div ref={drop} role={'DropZone'}>
      <Flex
        width="100%"
        minHeight="200px"
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
      <Flex justifyContent="center">
        <Button
          variant="primary"
          onClick={() => handleRow(HandleRowType.Add, id)}
        >
          <Icon as={MdOutlinePlaylistAdd} width="24px" height="24px" />
        </Button>
        <Button
          variant="primary"
          onClick={() => handleRow(HandleRowType.Delete, id)}
        >
          <Icon as={MdOutlineRemoveCircleOutline} width="24px" height="24px" />
        </Button>
      </Flex>
    </div>
  );
}
