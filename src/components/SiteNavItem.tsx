import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Switch,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { XYCoord } from 'dnd-core';
import { useRef } from 'react';
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ItemTypes } from '../config';
import { useDispatch } from '../hooks';
import {
  changeOrder,
  deleteMenu,
  updateMenu,
} from '../store/slices/menus.slice';
import { SiteMenu } from '../types';

const schema = yup
  .object({
    label: yup.string().required('Please enter site label'),
    url: yup.string().required('Please enter site url'),
    isOpenNew: yup.boolean(),
  })
  .required();

interface SiteNavProps {
  menu: SiteMenu;
  index: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function SiteNav({ menu, index }: SiteNavProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: menu.id,
      label: menu.label,
      url: menu.url,
      isOpenNew: menu.isOpenNew,
    },
  });
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.Menu,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const draggedIndex = item.index;
      const hoveredIndex = index;

      // Don't replace items with themselves
      if (draggedIndex === hoveredIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

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
      handleOrderMenu(draggedIndex, hoveredIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoveredIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Menu,
    item: () => {
      return { id: menu.id, index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleSaveData = (data: SiteMenu, menuId: string) => {
    dispatch(
      updateMenu({
        id: menuId,
        data,
      }),
    );
  };

  const handleDeleteNav = (menuId: string) => {
    dispatch(deleteMenu(menuId));
  };

  const handleOrderMenu = (draggedIndex: number, hoveredIndex: number) => {
    dispatch(changeOrder({ draggedIndex, hoveredIndex }));
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Box ref={ref} opacity={opacity} data-handler-id={handlerId}>
      <Accordion allowToggle allowMultiple>
        <AccordionItem>
          <AccordionButton px="0">
            <Box flex="1" textAlign="left">
              {menu.label}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px="1" pb={4}>
            <form
              onSubmit={handleSubmit(values => handleSaveData(values, menu.id))}
            >
              <Grid
                gridTemplateColumns="3fr 1fr"
                gridTemplateRows="1f 1fr"
                gap="2"
              >
                <FormControl isInvalid={!!errors.label} mb="2">
                  <FormLabel htmlFor="label">Label</FormLabel>
                  <Input
                    id="label"
                    placeholder="label"
                    {...register('label')}
                  />
                  <FormErrorMessage>
                    {errors.label && errors.label.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.isOpenNew} mb="2">
                  <FormLabel htmlFor="isOpenNew">New?</FormLabel>
                  <Switch id="isOpenNew" {...register('isOpenNew')} />
                  <FormErrorMessage>
                    {errors.isOpenNew && errors.isOpenNew.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.url} mb="2">
                  <FormLabel htmlFor="url">URL</FormLabel>
                  <Input id="url" placeholder="url" {...register('url')} />
                  <FormErrorMessage>
                    {errors.url && errors.url.message}
                  </FormErrorMessage>
                </FormControl>
              </Grid>
              <Flex justifyContent="flex-end" mt="1">
                <Button variant="link" mr="1" type="submit">
                  Save
                </Button>
                <Button variant="link" onClick={() => handleDeleteNav(menu.id)}>
                  Delete
                </Button>
              </Flex>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
