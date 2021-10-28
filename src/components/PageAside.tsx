import { Box, Heading, Grid } from '@chakra-ui/react';
import { Field } from './';
import { DraggableField } from '../types';
import { FieldType } from '../config';
import {
  SingleLineTextIcon,
  MultilineIcon,
  TextIcon,
  ButtonIcon,
  NumberIcon,
  CalenderIcon,
  SwitchIcon,
} from '../assets/icons';

const fields: DraggableField[] = [
  {
    type: FieldType.Text,
    info: {
      title: 'Single Text',
      icon: <SingleLineTextIcon />,
    },
  },
  {
    type: FieldType.MultilineText,
    info: {
      title: 'Multi Line Text',
      icon: <MultilineIcon />,
    },
  },
  {
    type: FieldType.RichText,
    info: {
      title: 'Rich Text',
      icon: <TextIcon />,
    },
  },
  {
    type: FieldType.Button,
    info: {
      title: 'Button',
      icon: <ButtonIcon />,
    },
  },
  {
    type: FieldType.Number,
    info: {
      title: 'Number',
      icon: <NumberIcon />,
    },
  },
  {
    type: FieldType.Date,
    info: {
      title: 'Date',
      icon: <CalenderIcon />,
    },
  },
  {
    type: FieldType.Switch,
    info: {
      title: 'Switch',
      icon: <SwitchIcon />,
    },
  },
];

const ColumnIcon = () => (
  <Grid
    border="1px solid #2D2D6A"
    gridTemplateColumns="1fr 1fr"
    bg="secondary500"
    gap="1"
    width="100%"
    height="100%"
    p="1"
    rounded="sm"
  >
    <Box bg="secondary400"></Box>
    <Box bg="secondary400"></Box>
  </Grid>
);

export default function Aside() {
  return (
    <Box
      p="2"
      height="100vh"
      position="sticky"
      top="80px"
      overflowY="scroll"
      sx={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Heading size="sm">Drag & Drop Contents</Heading>
      <Box mt="2">
        <Field
          type={FieldType.Column}
          info={{
            title: 'Add Columns',
            icon: <ColumnIcon />,
          }}
        />
        <Grid gridTemplateColumns="1fr 1fr" gap="2" mt="2">
          {fields.map((field, index) => (
            <Field key={index} {...field} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
