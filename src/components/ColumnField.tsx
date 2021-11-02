import { Text, Box, Flex, Grid } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import { FieldType, ItemTypes } from '../config';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { useEffect } from 'react';

interface DropResult {
  id: number;
  sectionId: number;
}

interface ColumnFieldProps {
  handleOpenColumnLayout: (id: number, sectionId: number) => void;
}

export default function ColumnField({
  handleOpenColumnLayout,
}: ColumnFieldProps) {
  const dispatch = useDispatch();
  const { dropZones, lastDropItemInfo } = useSelector(state => state.section);

  const [{ didDrop, isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Column,
      item: FieldType.Column,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          handleOpenColumnLayout(dropResult.id, dropResult.sectionId);
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
    [dropZones.length],
  );

  useEffect(() => {
    if (!didDrop && !isDragging && lastDropItemInfo) {
      // dispatch(removeUnUsedDropZones(lastDropItemInfo));
    }
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
        <Grid
          border="1px solid #2D2D6A"
          gridTemplateColumns="1fr 1fr"
          bg="secondary500"
          gap="1"
          width="100%"
          height="100%"
          p="1"
          rounded="sm"
        >
          <Box bg="secondary400"></Box>
          <Box bg="secondary400"></Box>
        </Grid>
      </Box>
      <Text>Add Columns</Text>
    </Flex>
  );
}
