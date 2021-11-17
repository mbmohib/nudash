import { Box, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { ComponentAction } from '.';
import { useDispatch, useSection } from '../hooks';
import { removeField, saveFieldData } from '../store/sectionSlice';
import { FieldProps } from '../types';

export default function NumberComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const [number, setNumber] = useState<string>('');

  const handleSaveData = () => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          value: number,
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
        <Text>{field.data.value}</Text>
      ) : (
        <Box width="100%">
          <Box>
            <Input
              onChange={event => setNumber(event.target.value)}
              type="number"
              placeholder="label"
            />
          </Box>
          <ComponentAction
            handleSave={handleSaveData}
            handleRemove={handleDelete}
          />
        </Box>
      )}
    </>
  );
}
