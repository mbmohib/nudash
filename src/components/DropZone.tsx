import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';

import {
  ButtonComponent,
  DateComponent,
  FileUploadComponent,
  IconComponent,
  LinkComponent,
  MultilineTextComponent,
  NumberComponent,
  RichTextComponent,
  SingleLineTextComponent,
  SwitchComponent,
} from '.';
import { FieldType, ItemTypes } from '../config';
import {
  useDebounce,
  useDispatch,
  useSectionMeta,
  useSelector,
} from '../hooks';
import {
  attachDropZoneId,
  handleAddDropZone,
  removeLastDropZone,
} from '../store/slices/page';
import { DraggableItem } from '../types';

interface DropZoneProps {
  dropZone: DraggableItem;
}

interface DropZonePlaceholderProps {
  isActive: boolean;
}

function DropZonePlaceholder({ isActive }: DropZonePlaceholderProps) {
  return (
    <Box
      mx="auto"
      p="1"
      my="1"
      height="80px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text>{isActive ? `Release to drop` : `Drop a content here`}</Text>
    </Box>
  );
}

export default function DropZone({ dropZone }: DropZoneProps) {
  const dispatch = useDispatch();
  const { sectionId, rowId, columnId } = useSectionMeta();
  const { lastDropItemInfo } = useSelector(state => state.page);
  const { fieldType } = dropZone;
  const [{ canDrop, isOver, handlerId, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Field,
      drop: (_, monitor) => ({
        id: dropZone.id,
        targetId: monitor.getHandlerId(),
        sectionId,
        rowId,
        columnId,
      }),
      canDrop: () => {
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
  const debouncedHover = useDebounce(isOverCurrent, 100);

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
  }, [debouncedHover]);

  useEffect(() => {
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
  }, [debouncedHover]);

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
      width="100%"
      justifyContent="flex-start"
      alignItems="center"
      rounded="base"
      opacity={isActive ? '0.2' : '1'}
      bgColor={isActive ? 'white' : 'transparent'}
    >
      {!fieldType && <DropZonePlaceholder isActive={isActive} />}

      {fieldType === FieldType.Text && (
        <SingleLineTextComponent field={dropZone} />
      )}
      {fieldType === FieldType.MultilineText && (
        <MultilineTextComponent field={dropZone} />
      )}
      {fieldType === FieldType.RichText && (
        <RichTextComponent field={dropZone} />
      )}
      {fieldType === FieldType.Number && <NumberComponent field={dropZone} />}
      {fieldType === FieldType.Link && <LinkComponent field={dropZone} />}
      {fieldType === FieldType.Switch && <SwitchComponent field={dropZone} />}
      {fieldType === FieldType.Image && (
        <FileUploadComponent field={dropZone} />
      )}
      {fieldType === FieldType.Icon && <IconComponent field={dropZone} />}
      {fieldType === FieldType.Date && <DateComponent field={dropZone} />}
      {fieldType === FieldType.Button && <ButtonComponent field={dropZone} />}
    </Flex>
  );
}
