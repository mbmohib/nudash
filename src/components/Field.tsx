import { Text, Box, Flex } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../config';
import { DraggableField } from '../types';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { handleFieldDrop } from '../store/sectionSlice';

interface DropResult {
  id: string;
}

export default function Field({ type, info }: DraggableField) {
  const dispatch = useDispatch();
  const { dropZones } = useSelector(state => state.section);
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
            }),
          );
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [type, dropZones.length],
  );

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      px="1"
      py="2"
      cursor="pointer"
      borderRadius="4"
      bg="secondary500"
      boxShadow="sm"
      ref={drag}
      data-testid={`box-${type}`}
    >
      <Box
        bgGradient="linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), #141430"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80px"
        width="80%"
        mb="1"
      >
        {info.icon}
      </Box>
      <Text>{info.title}</Text>
    </Flex>
  );
}
