import { Container, Grid, Box } from '@chakra-ui/react';
import { PageAside, Section } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useSelector, useDispatch } from '../hooks/useRedux';

export default function Page() {
  const { sections } = useSelector(state => state.section);

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid gridTemplateColumns="1fr 400px">
        <Container py="2" maxW="container.lg">
          {sections.map((section, index) => (
            <Section section={section} key={index} />
          ))}
        </Container>
        <PageAside />
      </Grid>
    </DndProvider>
  );
}
