import { Container, Grid } from '@chakra-ui/react';
import { PageAside, DropZone } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { FieldType } from '../types/FieldType';
import { HandleRowType } from '../components/DropZone';

interface Row {
  id: number;
  fieldType: FieldType | null;
}

const initialRowState: Row = {
  id: 0,
  fieldType: null,
};

export default function Page() {
  const [rows, setRow] = useState<Row[]>([initialRowState]);

  const onFieldDrop = (type: FieldType, rowId: number): void => {
    const rowsCopy = [...rows];
    rowsCopy[rowId].fieldType = type;
    setRow(rowsCopy);
  };

  const handleRow = (type: HandleRowType, index: number): void => {
    if (type === HandleRowType.Add) {
      const rowsCopy = [...rows];
      const position = index + 1;

      rowsCopy.splice(position, 0, {
        ...initialRowState,
        id: rows.length,
      });
      setRow(rowsCopy);
    }

    if (type === HandleRowType.Delete) {
      setRow(rows.filter(row => row.id !== index));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid gridTemplateColumns="1fr 300px">
        <Container py="2" maxW="container.md">
          {rows.map(row => (
            <DropZone
              key={row.id}
              id={row.id}
              handleRow={handleRow}
              fieldType={row.fieldType}
            />
          ))}
        </Container>
        <PageAside isRerender={rows.length} onFieldDrop={onFieldDrop} />
      </Grid>
    </DndProvider>
  );
}
