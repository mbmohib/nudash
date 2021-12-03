import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

import { FieldType, ItemTypes } from '../config';
import { useDispatch, useSelector } from '../hooks';
import { removeLastUnusedRow } from '../store/slices/page';

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
  const { sections, lastRowItemInfo } = useSelector(state => state.page);
  const notInitialRow = sections[0]?.rows[0]?.columns[0].length > 0;
  const [didDrop, setDidDrop] = useState<boolean>();
  const [sectionId, setSectionId] = useState<number>();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Column,
      item: FieldType.Column,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();

        if (didDrop !== monitor.didDrop()) {
          setDidDrop(monitor.didDrop());
        }

        if (item && dropResult) {
          setSectionId(dropResult.sectionId);
          handleOpenColumnLayout(dropResult.id, dropResult.sectionId);
        }
      },
      collect: monitor => {
        return {
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        };
      },
    }),
    [lastRowItemInfo],
  );

  useEffect(() => {
    if (
      !didDrop &&
      lastRowItemInfo &&
      notInitialRow &&
      !lastRowItemInfo.hasColumn
    ) {
      dispatch(removeLastUnusedRow());
    }

    if (
      didDrop &&
      lastRowItemInfo &&
      notInitialRow &&
      !lastRowItemInfo.hasColumn &&
      lastRowItemInfo.sectionId !== sectionId
    ) {
      dispatch(removeLastUnusedRow());
    }
  }, [didDrop, isDragging]);

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      px="1"
      pb="1"
      pt="2"
      cursor="pointer"
      borderRadius="4"
      bg="secondary.500"
      boxShadow="sm"
      opacity={isDragging ? '0.6' : '1'}
      ref={drag}
    >
      <Box
        bg="secondary.400"
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
          bg="secondary.500"
          gap="1"
          width="100%"
          height="100%"
          p="1"
          rounded="sm"
        >
          <Box bg="secondary.400"></Box>
          <Box bg="secondary.400"></Box>
        </Grid>
      </Box>
      <Text>Add Columns</Text>
    </Flex>
  );
}
