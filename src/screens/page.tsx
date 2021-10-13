import { Container, Grid } from '@chakra-ui/react';
import { PageAside, DropZone } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { FieldType } from '../types/FieldType';
import { HandleRowType } from '../components/DropZone';

export default function Page() {
  const [fieldType, setFieldType] = useState<FieldType | null>(null);
  const [rows, setRow] = useState<number[]>([0]);

  const onFieldDrop = (type: FieldType): void => {
    setFieldType(type);
  };

  const handleRow = (type: HandleRowType, index: number): void => {
    if (type === HandleRowType.Add) {
      const rowsCopy = [...rows];
      rowsCopy.splice(index + 1, 0, rows.length);
      setRow(rowsCopy);
    }

    if (type === HandleRowType.Delete) {
      setRow(rows.filter(row => row !== index));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid gridTemplateColumns="1fr 300px">
        <Container py="2" maxW="container.md">
          {rows.map(index => (
            <DropZone
              key={index}
              index={index}
              handleRow={handleRow}
              fieldType={fieldType}
            />
          ))}
        </Container>
        <PageAside onFieldDrop={onFieldDrop} />
      </Grid>
    </DndProvider>
  );
}
