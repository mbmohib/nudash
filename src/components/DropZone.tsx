import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { Button } from '.';
import { FieldType, ItemTypes } from '../config';
import { useDispatch, useSection, useSelector } from '../hooks';
import {
  attachDropZoneId,
  handleAddDropZone,
  removeLastDropZone,
} from '../store/sectionSlice';
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
      p="1"
      height="80px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text>{isActive ? `Release to drop` : `Drop a block here`}</Text>
    </Box>
  );
}

export default function DropZone({ id }: DropZoneProps) {
  const dispatch = useDispatch();
  const { sectionId, rowId, columnId } = useSection();
  const { dropZones, lastDropItemInfo } = useSelector(state => state.section);
  const dropZone = dropZones.find(item => item.id === id) as DraggableItem;
  const { fieldType } = dropZone || {};
  const [{ canDrop, isOver, handlerId, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Field,
      drop: (_, monitor) => ({ id, targetId: monitor.getHandlerId() }),
      canDrop() {
        if (dropZone.fieldType) {
          return false;
        }
        return true;
      },
      collect: monitor => {
        return {
          didDrop: monitor.didDrop(),
          isOverCurrent: monitor.isOver({ shallow: true }),
          handlerId: monitor.getHandlerId(),
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [dropZone],
  );
  const isActive = canDrop && isOver;

  useEffect(() => {
    if (
      lastDropItemInfo &&
      !lastDropItemInfo.hasField &&
      isOverCurrent &&
      handlerId &&
      dropZone.fieldType
    ) {
      dispatch(removeLastDropZone());
    }

    if (isOverCurrent && handlerId && dropZone.fieldType) {
      dispatch(
        handleAddDropZone({
          dropZoneId: dropZone.id,
          handlerId: handlerId as string,
          sectionId,
          rowId,
          columnId,
        }),
      );
    }
  }, [isOverCurrent]);

  useEffect(() => {
    if (handlerId) {
      dispatch(
        attachDropZoneId({
          sectionId,
          rowId,
          columnId,
          handlerId: handlerId as string,
          dropZoneId: dropZone.id,
        }),
      );
    }
  }, [dispatch, sectionId, columnId, rowId, dropZone.id, handlerId]);

  return (
    <Flex
      ref={drop}
      role={`DropZone-${dropZone.id}`}
      minHeight="100px"
      width="100%"
      justifyContent="center"
      alignItems="center"
      rounded="base"
      p="2"
      opacity={isActive ? '0.2' : '1'}
      bgColor={isActive ? 'white' : 'transparent'}
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
      {fieldType === FieldType.Button && <Button field={dropZone} />}
    </Flex>
  );
}
