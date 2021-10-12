import { Container, Box, Grid } from '@chakra-ui/react'
import { PageAside, DropZone } from '../components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState } from 'react'
import { FieldType } from '../components/Field'

export const ItemTypes = {
  BOX: 'box',
}

export default function Page() {
  const [fieldType, setFieldType] = useState<FieldType | null>(null)

  const onFieldDrop = (type: FieldType) => {
    setFieldType(type)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid gridTemplateColumns="1fr 300px">
        <Container py="2" maxW="container.md">
          <DropZone fieldType={fieldType} />
        </Container>
        <PageAside onFieldDrop={onFieldDrop} />
      </Grid>
    </DndProvider>
  )
}
