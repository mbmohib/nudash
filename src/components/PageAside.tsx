import { Box, Heading } from '@chakra-ui/react';
import { Field } from './';
import { DraggableField } from '../types/DraggableField';
import { FieldType } from '../types/FieldType';

const fields: DraggableField[] = [
  {
    type: FieldType.Text,
    info: {
      title: 'Single Line Text',
      subtitle: 'Headings and titles',
    },
  },
  {
    type: FieldType.MultilineText,
    info: {
      title: 'Multi Line Text',
      subtitle: 'Description',
    },
  },
];

interface AsideProps {
  handleFieldDrop: (type: FieldType, dropZoneId: string) => void;
  isRerender: number;
}

export default function Aside({ handleFieldDrop, isRerender }: AsideProps) {
  return (
    <Box p="2" bgColor="secondary" height="100vh">
      <Heading size="sm">Add fields</Heading>
      <Box mt="3">
        {fields.map((field, index) => (
          <Field
            key={index}
            {...field}
            isRerender={isRerender}
            handleFieldDrop={handleFieldDrop}
          />
        ))}
      </Box>
    </Box>
  );
}
