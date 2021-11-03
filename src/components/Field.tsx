import { Text, Box, Flex } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../config';
import { DraggableField } from '../types';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { handleFieldDrop } from '../store/sectionSlice';
import { useEffect } from 'react';

interface DropResult {
  id: string;
}

export default function Field({ type, info }: DraggableField) {
  const dispatch = useDispatch();
  const { dropZones, lastDropItemInfo } = useSelector(state => state.section);

  const [{ didDrop, isDragging }, drag] = useDrag(
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
            }),
          );
        }
      },
      collect: monitor => {
        return {
          didDrop: monitor.didDrop(),
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        };
      },
    }),
    [type, dropZones.length],
  );

  useEffect(() => {
    // if (!didDrop && !isDragging && lastDropItemInfo) {
    //   dispatch(removeUnUsedDropZones(lastDropItemInfo));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
