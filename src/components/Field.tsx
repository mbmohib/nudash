import { Text, Box, Icon, Grid } from '@chakra-ui/react';
import { FiType } from 'react-icons/fi';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../types/ItemTypes';
import { FieldType } from '../types/FieldType';
import { DraggableField } from '../types/DraggableField';

interface FieldProps extends DraggableField {
  onFieldDrop: (type: FieldType, rowId: number) => void;
  isRerender: number;
}

interface DropResult {
  id: number;
}

export default function Field({
  type,
  info,
  onFieldDrop,
  isRerender,
}: FieldProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Field,
      item: { type },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          onFieldDrop(item.type, dropResult.id);
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [type, isRerender],
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
