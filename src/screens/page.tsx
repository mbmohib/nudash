import { Container, Grid, Box } from '@chakra-ui/react';
import { PageAside, DropZone } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { FieldType } from '../types/FieldType';
import { HandleRowType } from '../components/DropZone';
import { nanoid } from 'nanoid';

interface Row {
  id: string;
  fieldType: FieldType | null;
}

const initialRowState: Row = {
  id: nanoid(),
  fieldType: null,
};

export default function Page() {
  const [rows, setRow] = useState<Row[]>([initialRowState]);

  const onFieldDrop = (type: FieldType, rowId: string): void => {
    const item = rows.find(row => row.id === rowId) as Row;

    const updatedItem = {
      ...item,
      fieldType: type,
    };

    setRow({
      ...rows,
      ...updatedItem,
    });
  };

  const handleRow = (type: HandleRowType, rowId: string): void => {
    if (type === HandleRowType.Add) {
      const rowsCopy = [...rows];
      const position = rows.findIndex(row => row.id === rowId) + 1;

      rowsCopy.splice(position, 0, {
        ...initialRowState,
        id: nanoid(),
      });
      setRow(rowsCopy);
    }

    if (type === HandleRowType.Delete) {
      setRow(rows.filter(row => row.id !== rowId));
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
