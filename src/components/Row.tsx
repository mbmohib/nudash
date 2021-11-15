import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { Column } from '.';
import { ItemTypes } from '../config';
import { useDispatch, useSelector } from '../hooks';
import { SectionContext } from '../hooks/useSection';
import { handleAddRow, removeLastUnusedRow } from '../store/sectionSlice';
import { DraggableItem } from '../types';

interface RowProps {
  row: {
    id: number;
    columns: DraggableItem[][];
  };
  sectionId: number;
  rowId: number;
}

export default function Row({ sectionId, rowId, row }: RowProps) {
  const dispatch = useDispatch();
  const { sections, lastRowItemInfo } = useSelector(state => state.section);
  const sectionIndex = sections.findIndex(section => section.id === sectionId);
  const rowIndex = sections[sectionIndex].rows.findIndex(
    rowItem => rowItem.id === rowId,
  );
  const currentColumns = sections[sectionIndex].rows[rowIndex].columns[0];
  const notInitialRow = sections[0].rows[0].columns[0].length > 0;

  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Column,
      drop: (_, monitor) => ({
        id: rowId,
        sectionId,
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
          <SectionContext.Provider
            key={columnIndex}
            value={{
              sectionId,
              rowId,
              columnId: columnIndex,
            }}
          >
            <Column column={column} />
          </SectionContext.Provider>
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
