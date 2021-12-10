import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import { XYCoord } from 'dnd-core';
import { useRef } from 'react';
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd';
import { AiOutlineHolder } from 'react-icons/ai';

import { Row } from '.';
import {
  CollapseIcon,
  ExpandIcon,
  FileMinusIcons,
  FilePlusIcons,
} from '../assets/icons';
import { ItemTypes } from '../config';
import { useDispatch, useToggle } from '../hooks';
import {
  handleAddSection,
  handleRemoveSection,
  handleSectionOrder,
} from '../store/slices';
import { Section as SectionType } from '../types';

interface SectionProps {
  section: SectionType;
  index: number;
  totalSection: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function Section({
  section,
  totalSection,
  index,
}: SectionProps) {
  const dispatch = useDispatch();
  const [expand, setExpand] = useToggle(true);
  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.Section,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!dragRef.current) {
        return;
      }
      const draggedIndex = item.index;
      const hoveredIndex = index;

      // Don't replace items with themselves
      if (draggedIndex === hoveredIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dragRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (draggedIndex < hoveredIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (draggedIndex > hoveredIndex && hoverClientY > hoverMiddleY) {
        // eslint-disable-next-line no-useless-return
        return;
      }

      // Time to actually perform the action
      // moveCard(draggedIndex, hoveredIndex);
      dispatch(handleSectionOrder({ draggedIndex, hoveredIndex }));

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoveredIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.Section,
    item: () => {
      return { id: section.id, index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(dragRef);
  drop(preview(previewRef));

  return (
    <Box
      width="100%"
      m="1"
      position="relative"
      bgColor="secondary.500"
      rounded="base"
      mb="2"
      p="2"
      ref={previewRef}
      opacity={opacity}
      data-handler-id={handlerId}
    >
      <Box maxHeight={expand ? '100%' : '100px'} overflow="hidden">
        {section.rows.map(row => (
          <Row key={row.id} sectionId={section.id} row={row} />
        ))}
      </Box>

      <Flex justifyContent="center" py="2">
        <Button
          fontWeight="normal"
          variant="link"
          leftIcon={<FilePlusIcons />}
          onClick={() =>
            dispatch(
              handleAddSection({
                sectionId: section.id,
              }),
            )
          }
        >
          Add Section
        </Button>
        <Button
          disabled={totalSection === 1}
          fontWeight="normal"
          leftIcon={<FileMinusIcons />}
          variant="link"
          ml="2"
          onClick={() =>
            dispatch(
              handleRemoveSection({
                sectionId: section.id,
              }),
            )
          }
        >
          Delete Section
        </Button>
      </Flex>

      <Box
        role="drag-row"
        position="absolute"
        left="-7"
        ref={dragRef}
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <Button
          variant="primary"
          _hover={{
            cursor: 'move',
          }}
        >
          <Icon as={AiOutlineHolder} width="24px" height="24px" />
        </Button>
      </Box>

      <Box
        role="expand"
        position="absolute"
        sx={{
          top: '-10px',
          right: '-6px',
        }}
      >
        {expand && (
          <Button variant="icon" onClick={setExpand}>
            <CollapseIcon />
          </Button>
        )}
        {!expand && (
          <Button variant="icon" onClick={setExpand}>
            <ExpandIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
}
