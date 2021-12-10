import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { Column } from '.';
import { DeleteIcon } from '../assets/icons';
import { ItemTypes } from '../config';
import { useDebounce, useDispatch, useSelector } from '../hooks';
import { SectionContext } from '../hooks/useSectionMeta';
import { handleAddRow, removeLastUnusedRow, removeRow } from '../store/slices';
import { Row as RowType, Section } from '../types';

interface RowProps {
  row: RowType;
  sectionId: Section['id'];
}

export default function Row({ sectionId, row }: RowProps) {
  const dispatch = useDispatch();
  const { sections, lastRowItemInfo } = useSelector(state => state.page);
  const sectionIndex = sections.findIndex(section => section.id === sectionId);
  const rowIndex = sections[sectionIndex].rows.findIndex(
    rowItem => rowItem.id === row.id,
  );
  const currentColumns = sections[sectionIndex].rows[rowIndex].columns[0];
  const notInitialRow = sections[sectionIndex].rows[0].columns[0].length > 0;

  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Column,
      drop: (_, monitor) => ({
        id: row.id,
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
  const debouncedHover = useDebounce(isOverCurrent, 100);

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
  }, [debouncedHover]);

  useEffect(() => {
    if (isOverCurrent && currentColumns.length !== 0) {
      dispatch(
        handleAddRow({
          sectionId,
          rowId: row.id,
        }),
      );
    }
  }, [debouncedHover]);

  const handleRowRemove = () => {
    dispatch(
      removeRow({
        sectionId,
        rowId: row.id,
      }),
    );
  };

  return (
    <Flex
      width="100%"
      position="relative"
      ref={drop}
      role={`Row-${row.id}`}
      opacity={isOver ? '0.2' : '1'}
      bgColor={isOver ? 'white' : 'transparent'}
      gridGap="2"
      p="2"
    >
      {row.columns[0].length ? (
        row.columns.map((column, columnIndex) => (
          <SectionContext.Provider
            key={columnIndex}
            value={{
              sectionId,
              rowId: row.id,
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
          width="80%"
          mx="auto"
          flexDirection="column"
          border="1px dashed"
          borderColor="secondary.100"
        >
          {!isActive && sections[sectionIndex].rows.length > 1 && (
            <Button variant="iconSolid" mb="1">
              <DeleteIcon width={10} onClick={handleRowRemove} />
            </Button>
          )}
          {isActive ? `Release to drop` : `Drag & Drop Column here`}
        </Flex>
      )}
    </Flex>
  );
}
