import { Box, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

import { ComponentAction } from '.';
import { useDispatch, useSection } from '../hooks';
import { removeField, saveFieldData } from '../store/sectionSlice';
import { FieldProps } from '../types';

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');

  const handleSaveData = () => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
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
        <Text>{field.data.value}</Text>
      ) : (
        <Box width="100%">
          <Box>
            <Textarea
              onChange={event => setValue(event.target.value)}
              type="text"
              placeholder="Write here.."
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
