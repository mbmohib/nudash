import { Box, Grid, Heading } from '@chakra-ui/react';

import { ColumnField, Field } from '.';
import {
  ButtonIcon,
  CalenderIcon,
  ImageIcon,
  MultilineIcon,
  NumberIcon,
  SingleLineTextIcon,
  SwitchIcon,
  SymbolIcon,
  TextIcon,
} from '../assets/icons';
import { FieldType } from '../config';
import { DraggableField } from '../types';

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
    type: FieldType.Link,
    info: {
      title: 'Link',
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
    type: FieldType.Image,
    info: {
      title: 'Image',
      icon: <ImageIcon />,
    },
  },
  {
    type: FieldType.Icon,
    info: {
      title: 'Icon',
      icon: <SymbolIcon />,
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

interface DraggableComponentsProps {
  handleOpenColumnLayout: (id: number, sectionId: string) => void;
}

export default function DraggableComponents({
  handleOpenColumnLayout,
}: DraggableComponentsProps) {
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
        <ColumnField handleOpenColumnLayout={handleOpenColumnLayout} />
        <Grid gridTemplateColumns="1fr 1fr" gap="2" mt="2">
          {fields.map((field, index) => (
            <Field key={index} {...field} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
