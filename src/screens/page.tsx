import { Container, Box, Grid } from '@chakra-ui/react'
import { PageAside } from '../components'

export default function Page() {
  return (
    <Grid gridTemplateColumns="1fr 300px">
      <Container py="2" maxW="container.md">
        There are many benefits to a joint design and development system. Not
        only does it bring benefits to the design team, but it also brings
        benefits to engineering teams. It makes sure that our experiences have a
        consistent look and feel, not just in our design specs, but in
        production
      </Container>
      <PageAside />
    </Grid>
  )
}
