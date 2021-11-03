import { Box, Flex } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import { ItemTypes, ActionType } from '../config';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { handleRow } from '../store/sectionSlice';
import { DraggableItem } from '../types';
import { Column } from './';

interface RowProps {
  row: {
    id: number;
    columns: DraggableItem[][];
  };
  rowId: number;
  sectionId: number;
}

export default function Row({ row, rowId, sectionId }: RowProps) {
  const dispatch = useDispatch();
  const { sections } = useSelector(state => state.section);
  const sectionIndex = sections.findIndex(section => section.id === sectionId);
  const rowIndex = sections[sectionIndex].rows.findIndex(
    row => row.id === rowId,
  );

  const currentColumns = sections[sectionIndex].rows[rowIndex].columns[0];

  const [{ canDrop, isOver, handlerId }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Column,
      drop: (_, monitor) => ({
        id: rowId,
        sectionId: sectionId,
        targetId: monitor.getHandlerId(),
      }),
      hover(_, monitor) {
        const hoveredHandlerId = monitor.getHandlerId();

        if (currentColumns.length !== 0) {
          dispatch(
            handleRow({
              actionType: ActionType.Add,
              sectionId,
              rowId,
            }),
          );
        }
      },
      canDrop() {
        if (currentColumns.length !== 0) {
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
    [currentColumns.length],
  );

  return (
    <Flex
      width="100%"
      position="relative"
      ref={drop}
      role={`Row DropZone-${rowId}`}
      minHeight="80px"
      opacity={isOver ? '0.2' : '1'}
      bgColor={isOver ? 'white' : 'transparent'}
      borderTop={rowId !== 0 ? '1px solid #2D2D6A' : 'none'}
      gridGap="2"
      p="2"
    >
      {row.columns.map((column, columnIndex) => (
        <Column
          key={columnIndex}
          rowId={rowId}
          sectionId={sectionId}
          column={column}
          columnId={columnIndex}
        />
      ))}
    </Flex>
  );
}
