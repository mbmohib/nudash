import { Box, Heading } from '@chakra-ui/react'
import { Field } from './'
import { FieldType, FieldProps } from './Field'

const fields: FieldProps[] = [
  {
    type: FieldType.Text,
    info: {
      title: 'Single Line Text',
      subtitle: 'Headings and titles',
    },
  },
  {
    type: FieldType.MultilineText,
    info: {
      title: 'Multi Line Text',
      subtitle: 'Description',
    },
  },
]

interface AsideProps {
  onFieldDrop: (type: FieldType) => void
}

export default function Aside({ onFieldDrop }: AsideProps) {
  return (
    <Box p="2" bgColor="secondary" height="100vh">
      <Heading size="sm">Add fields</Heading>
      <Box mt="3">
        {fields.map(field => (
          <Field {...field} onFieldDrop={onFieldDrop} />
        ))}
      </Box>
    </Box>
  )
}
