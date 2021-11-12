// import { DraggableItem } from '../types';
import { Button, Input, Grid, Box, Flex } from '@chakra-ui/react';
import { handleFieldData } from '../store/sectionSlice';
import { useDispatch } from '../hooks/useRedux';
import { useState } from 'react';

// FIXME: fix any type
export default function ButtonComponent({ field }: any) {
  const dispatch = useDispatch();
  const [label, setLabel] = useState<string>();

  const handleSaveData = () => {
    dispatch(
      handleFieldData({
        dropZoneId: field.id,
        data: {
          label: label,
        },
      }),
    );
  };

  return (
    <>
      {field.data ? (
        <Button>{field.data.label}</Button>
      ) : (
        <Box>
          <Grid gridTemplateColumns="1fr 3fr" gap="1" width="100%">
            <Input
              onChange={event => setLabel(event.target.value)}
              type="text"
              placeholder="label"
            />
            <Input type="text" placeholder="Link" />
          </Grid>
          <Flex justifyContent="flex-end" mt="1">
            <Button variant="link" mr="1" onClick={handleSaveData}>
              Save
            </Button>
            <Button variant="link">Cancel</Button>
          </Flex>
        </Box>
      )}
    </>
  );
}