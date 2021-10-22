import { Text, Box, Icon, Grid } from '@chakra-ui/react';
import { FiType } from 'react-icons/fi';
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
    <div ref={drag} data-testid={`box-${type}`}>
      <Grid
        gridTemplateColumns="1fr 3fr"
        gap="2"
        alignItems="center"
        border="1px"
        borderColor={isDragging ? 'gray.100' : 'gray.500'}
        p="1"
        cursor="pointer"
        borderRadius="4"
        my="2"
      >
        <Box
          bgColor="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="40px"
        >
          <Icon as={FiType} color="primary" width="24px" height="24px" />
        </Box>
        <Box>
          <Text>{info.title}</Text>
          <Text fontSize="xs" color="gray.400">
            {info.subtitle}
          </Text>
        </Box>
      </Grid>
    </div>
  );
}
