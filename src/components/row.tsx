import { Button, Flex, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { Column } from '.';
import { DeleteIcon } from '../assets/icons';
import { ItemTypes } from '../config';
import { useDebounce, useDispatch, useSelector } from '../hooks';
import { SectionProvider } from '../hooks/use-section-meta';
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
  const toast = useToast();
  const [{ canDrop, isOver, isOverCurrent, currentItem }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.Field, ItemTypes.Column],
      drop: (_, monitor) => ({
        id: row.id,
        sectionId,
        targetId: monitor.getHandlerId(),
      }),
      canDrop: (item: { type: string }) => {
        if (currentColumns.length !== 0 || item.type !== ItemTypes.Column) {
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
          currentItem: monitor.getItem(),
        };
      },
    }),
    [currentColumns.length],
  );
  const isAcceptedItem = currentItem && currentItem.type === ItemTypes.Column;
  const isActive = canDrop && isOver && isAcceptedItem;
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
    if (isAcceptedItem && isOverCurrent && currentColumns.length !== 0) {
      dispatch(
        handleAddRow({
          sectionId,
          rowId: row.id,
        }),
      );
    }
  }, [debouncedHover]);

  useEffect(() => {
    if (!isAcceptedItem && debouncedHover) {
      toast({
        title: 'Please add column first',
        status: 'error',
        isClosable: true,
        variant: 'subtle',
        position: 'bottom-right',
        duration: 3000,
      });
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
      opacity={isActive || (!isAcceptedItem && debouncedHover) ? '0.2' : '1'}
      bgColor={
        // eslint-disable-next-line no-nested-ternary
        !isAcceptedItem && debouncedHover
          ? 'error'
          : isActive
          ? 'white'
          : 'transparent'
      }
      gridGap="2"
      p="2"
    >
      {row.columns[0].length ? (
        row.columns.map((column, columnIndex) => (
          <SectionProvider
            key={columnIndex}
            initialState={{
              sectionId,
              rowId: row.id,
              columnId: columnIndex,
            }}
          >
            <Column column={column} />
          </SectionProvider>
        ))
      ) : (
        <Flex
          minHeight="80px"
          alignItems="center"
          justifyContent="center"
          width="80%"
          mx="auto"
          border="1px dashed"
          borderColor="secondary.100"
          position="relative"
        >
          {!isActive && sections[sectionIndex].rows.length > 1 && (
            <Button
              position="absolute"
              transform="translateX(-50%)"
              left="50%"
              bottom="-17px"
              variant="iconSolid"
              mb="1"
            >
              <DeleteIcon width={13} onClick={handleRowRemove} />
            </Button>
          )}
          {isActive ? `Release to drop` : `Drag & Drop Column here`}
        </Flex>
      )}
    </Flex>
  );
}
