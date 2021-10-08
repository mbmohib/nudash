import { Box, Grid } from '@chakra-ui/layout'
import React from 'react'

type ContentProps = {
  children: React.ReactNode
}

export default function Content({ children }: ContentProps) {
  return <Box>{children}</Box>
}
