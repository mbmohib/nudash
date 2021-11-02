import { Box } from '@chakra-ui/react';
import { DropZone } from './';
import { DraggableItem } from '../types';
import { useDrop } from 'react-dnd';
import { ItemTypes, FieldType, ActionType } from '../config';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  handleDropZone,
  attachDropZoneId,
  handleRow,
} from '../store/sectionSlice';

interface ColumnProps {
  column: DraggableItem[];
  columnId: number;
  rowId: number;
  sectionId: number;
}

export default function Column({
  column,
  columnId,
  rowId,
  sectionId,
}: ColumnProps) {
  const dispatch = useDispatch();
  const { sections } = useSelector(state => state.section);
  const sectionIndex = sections.findIndex(section => section.id === sectionId);
  const rowIndex = sections[sectionIndex].rows.findIndex(
    row => row.id === rowId,
  );
  const columnIndex = sections[sectionIndex].rows[rowIndex].columns.findIndex(
    (_, index) => index === columnId,
  );
  const currentColumn =
    sections[sectionIndex].rows[rowIndex].columns[columnIndex];

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

        dispatch(
          handleRow({
            actionType: ActionType.Add,
            sectionId,
            rowId,
          }),
        );
      },
      collect: monitor => {
        return {
          handlerId: monitor.getHandlerId(),
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [],
  );

  return (
    <Box width="100%" ref={drop} role={'DropZone'} minHeight="80px">
      {column.map(dropZone => (
        <Box position="relative" key={dropZone.id}>
          <DropZone
            sectionId={sectionId}
            rowId={rowId}
            columnId={columnId}
            id={dropZone.id}
          />
        </Box>
      ))}
    </Box>
  );
}
