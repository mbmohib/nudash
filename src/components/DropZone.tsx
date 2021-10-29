import { useDrop } from 'react-dnd';
import { ItemTypes, FieldType, ActionType } from '../config';
import {
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { handleDropZone } from '../store/sectionSlice';
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
  const dispatch = useDispatch();
  const { dropZones } = useSelector(state => state.section);
  const dropZone = dropZones.find(item => item.id === id) as DraggableItem;

  const [{ canDrop, isOver, handlerId }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Field,
      drop: (item, monitor) => ({ id, targetId: monitor.getHandlerId() }),
      hover(item, monitor) {
        const handlerId = monitor.getHandlerId();

        if (dropZone.fieldType) {
          dispatch(
            handleDropZone({
              actionType: ActionType.Add,
              dropZoneId: dropZone.id,
              sectionId: 0,
              rowId: 0,
              columnId: 0,
            }),
          );
        }
      },
      canDrop() {
        if (dropZone.fieldType) {
          return false;
        }
        return true;
      },
      collect: monitor => {
        return {
          handlerId: monitor.getHandlerId(),
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [dropZone],
  );
  const { fieldType, data } = dropZone || {};

  const isActive = canDrop && isOver;

  console.log('handlerId :>> ', handlerId);

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
