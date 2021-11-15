import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '../config';
import { useDispatch, useSelector } from '../hooks';
import { handleFieldDrop, removeLastDropZone } from '../store/sectionSlice';
import { DraggableField } from '../types';

interface DropResult {
  id: string;
  sectionId: number;
  rowId: number;
  columnId: number;
}

export default function Field({ type, info }: DraggableField) {
  const dispatch = useDispatch();
  const { dropZones, lastDropItemInfo } = useSelector(state => state.section);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Field,
      item: { type },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          dispatch(
            handleFieldDrop({
              fieldType: item.type,
              dropZoneId: dropResult.id,
              sectionId: dropResult.sectionId,
              rowId: dropResult.rowId,
              columnId: dropResult.columnId,
            }),
          );
        }
      },
      collect: monitor => {
        return {
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        };
      },
    }),
    [type, dropZones.length],
  );

  useEffect(() => {
    if (!isDragging && lastDropItemInfo && !lastDropItemInfo.hasField) {
      dispatch(removeLastDropZone());
    }
  }, [dispatch, isDragging]);

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      px="1"
      pb="1"
      pt="2"
      cursor="pointer"
      borderRadius="4"
      bg="secondary500"
      boxShadow="sm"
      ref={drag}
    >
      <Box
        bg="secondary400"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="50px"
        width="80%"
        mb="1"
      >
        {info.icon}
      </Box>
      <Text>{info.title}</Text>
    </Flex>
  );
}
