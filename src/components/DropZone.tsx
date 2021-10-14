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
import { RowActionType } from '../types/RowActionType';
import { HandleDropZoneType } from '../types/HandleDropZoneType';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';

interface DropZoneProps {
  fieldType: FieldType | null;
  id: string;
  sectionId: number;
  columnId: number;
  handleDropZone: HandleDropZoneType;
}

export default function DropZone({
  fieldType,
  handleDropZone,
  id,
  sectionId,
  columnId,
}: DropZoneProps) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.Field,
    drop: () => ({ id }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  const placeholder = isActive ? `Release to drop` : `Drag a box here`;

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <div ref={drop} role={'DropZone'}>
      <Flex
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
      <Flex justifyContent="center">
        <Button
          variant="primary"
          onClick={() =>
            handleDropZone(RowActionType.Add, id, sectionId, columnId)
          }
        >
          <Icon as={MdOutlinePlaylistAdd} width="24px" height="24px" />
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleDropZone(RowActionType.Delete, id, sectionId, columnId)
          }
        >
          <Icon as={MdOutlineRemoveCircleOutline} width="24px" height="24px" />
        </Button>
      </Flex>
    </div>
  );
}
