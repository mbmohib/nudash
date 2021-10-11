import { Box, Heading } from '@chakra-ui/react'
import { Field } from './'

export default function Aside() {
  return (
    <Box p="2" bgColor="secondary" height="100vh">
      <Heading size="sm">Add fields</Heading>
      <Box mt="3">
        <Field />
        <Field />
        <Field />
      </Box>
    </Box>
  )
}
