import React from 'react'
import { Grid, Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

export default function Sidebar() {
  return (
    <Grid gridTemplateColumns="100px 1fr" height="100vh">
      <Box bgColor="secondary">
        Persistent sidebar
        <Button variant="solid" bg="primary.light" color="white">
          Hello!
        </Button>
      </Box>
      <Box bgColor="secondary">Closable sidebar</Box>
    </Grid>
  )
}
