import { Text, Box, Icon, Grid } from '@chakra-ui/react'
import { FiType } from 'react-icons/fi'

export default function Footer() {
  return (
    <Grid
      gridTemplateColumns="1fr 3fr"
      gap="2"
      alignItems="center"
      border="1px"
      borderColor="gray.500"
      p="1"
      cursor="pointer"
      borderRadius="4"
      my="2"
    >
      <Box
        bgColor="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="40px"
      >
        <Icon as={FiType} color="primary" width="24px" height="24px" />
      </Box>
      <Box>
        <Text>Single line Text</Text>
        <Text fontSize="xs" color="gray.400">
          Heading & Titles
        </Text>
      </Box>
    </Grid>
  )
}
