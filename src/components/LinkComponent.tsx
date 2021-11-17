import { Box, Grid, Input, Link } from '@chakra-ui/react';
import { useState } from 'react';

import { ComponentAction } from '.';
import { useDispatch, useSection } from '../hooks';
import { removeField, saveFieldData } from '../store/sectionSlice';
import { FieldProps } from '../types';

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const [label, setLabel] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const handleSaveData = () => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          label,
          value,
        },
      }),
    );
  };

  const handleDelete = () => {
    dispatch(removeField({ dropZoneId: field.id, sectionId, rowId, columnId }));
  };

  return (
    <>
      {field.data ? (
        <Link color="primary" to={field.data.value}>
          {field.data.label}
        </Link>
      ) : (
        <Box>
          <Grid gridTemplateColumns="1fr 3fr" gap="1" width="100%">
            <Input
              onChange={event => setLabel(event.target.value)}
              type="text"
              placeholder="label"
            />
            <Input
              type="text"
              placeholder="Link"
              onChange={event => setValue(event.target.value)}
            />
          </Grid>
          <ComponentAction
            handleSave={handleSaveData}
            handleRemove={handleDelete}
          />
        </Box>
      )}
    </>
  );
}
