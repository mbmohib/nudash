import { useDrop } from 'react-dnd'
import { ItemTypes } from '../screens/page'
import { Box, Textarea } from '@chakra-ui/react'
import { FieldType } from './Field'

interface DropZoneProps {
  fieldType: FieldType | null
}

export default function DropZone({ fieldType }: DropZoneProps) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'DropZone' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <div ref={drop} role={'DropZone'}>
      <Box
        width="100%"
        minHeight="200px"
        bgColor={isActive ? 'gray.400' : 'gray.600'}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isActive ? 'Release to drop' : 'Drag a box here'}
        {fieldType === FieldType.MultilineText && <Textarea />}
      </Box>
    </div>
  )
}
