import { Box, Button, Grid, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { ComponentAction } from '.';
import { useDispatch, useSection } from '../hooks';
import { handleFieldData } from '../store/sectionSlice';
import { FieldProps } from '../types';

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const [label, setLabel] = useState<string>('');

  const handleSaveData = () => {
    dispatch(
      handleFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          label,
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
          <ComponentAction handleSave={handleSaveData} />
        </Box>
      )}
    </>
  );
}
