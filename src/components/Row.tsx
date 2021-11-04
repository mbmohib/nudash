import { Flex } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../config';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { handleAddRow, removeLastUnusedRow } from '../store/sectionSlice';
import { DraggableItem } from '../types';
import { Column } from './';
import { useEffect } from 'react';

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
  const { sections, lastRowItemInfo } = useSelector(state => state.section);
  const sectionIndex = sections.findIndex(section => section.id === sectionId);
  const rowIndex = sections[sectionIndex].rows.findIndex(
    row => row.id === rowId,
  );
  const currentColumns = sections[sectionIndex].rows[rowIndex].columns[0];
  const notInitialRow = sections[0].rows[0].columns[0].length > 0;

  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Column,
      drop: (_, monitor) => ({
        id: rowId,
        sectionId: sectionId,
        targetId: monitor.getHandlerId(),
      }),
      canDrop() {
        if (currentColumns.length !== 0) {
          return false;
        }
        return true;
      },
      collect: monitor => {
        return {
          isOverCurrent: monitor.isOver({ shallow: true }),
          handlerId: monitor.getHandlerId(),
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [currentColumns.length],
  );

  const isActive = canDrop && isOver;

  useEffect(() => {
    if (
      lastRowItemInfo &&
      !lastRowItemInfo.hasColumn &&
      isOverCurrent &&
      notInitialRow &&
      currentColumns.length !== 0
    ) {
      dispatch(removeLastUnusedRow());
    }

    if (isOverCurrent && currentColumns.length !== 0) {
      dispatch(
        handleAddRow({
          sectionId,
          rowId,
        }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOverCurrent]);

  return (
    <Flex
      width="100%"
      position="relative"
      ref={drop}
      role={`Row DropZone-${rowId}`}
      opacity={isOver ? '0.2' : '1'}
      bgColor={isOver ? 'white' : 'transparent'}
      borderTop={rowId !== 0 ? '1px solid #2D2D6A' : 'none'}
      gridGap="2"
      p="2"
    >
      {row.columns[0].length ? (
        row.columns.map((column, columnIndex) => (
          <Column
            key={columnIndex}
            rowId={rowId}
            sectionId={sectionId}
            column={column}
            columnId={columnIndex}
          />
        ))
      ) : (
        <Flex
          minHeight="80px"
          alignItems="center"
          justifyContent="center"
          width="100%"
          border="1px dashed"
          borderColor="secondary100"
        >
          {isActive ? `Release to drop` : `Drag & Drop Column here`}
        </Flex>
      )}
    </Flex>
  );
}
