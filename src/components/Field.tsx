import { Text, Box, Icon, Grid } from '@chakra-ui/react';
import { FiType } from 'react-icons/fi';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../screens/page';

export enum FieldType {
  Text = 'text',
  MultilineText = 'multilineText',
  RichText = 'richText',
  Image = 'image',
  Number = 'number',
}

export interface FieldProps {
  type: FieldType;
  info: {
    title: string;
    subtitle: string;
  };
}

interface DropResult {
  name: string;
}

export default function Field({
  type,
  info,
  onFieldDrop,
}: FieldProps & { onFieldDrop: (type: FieldType) => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        onFieldDrop(item.type);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div ref={drag} data-testid={`box-${type}`}>
      <Grid
        gridTemplateColumns="1fr 3fr"
        gap="2"
        alignItems="center"
        border="1px"
        borderColor={isDragging ? 'gray.100' : 'gray.500'}
        p="1"
        cursor="pointer"
        borderRadius="4"
        my="2"
      >
        <Box
          bgColor="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="40px"
        >
          <Icon as={FiType} color="primary" width="24px" height="24px" />
        </Box>
        <Box>
          <Text>{info.title}</Text>
          <Text fontSize="xs" color="gray.400">
            {info.subtitle}
          </Text>
        </Box>
      </Grid>
    </div>
  );
}
