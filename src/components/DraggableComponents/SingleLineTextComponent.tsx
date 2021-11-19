import { Box, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ComponentAction, ComponentActionWithData } from '..';
import { useDispatch, useSection, useToggle } from '../../hooks';
import { removeField, saveFieldData } from '../../store/sectionSlice';
import { FieldProps } from '../../types';

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [showEditorView, toggleShowEditorView, setShowEditorView] = useToggle();

  useEffect(() => {
    setValue((field?.data?.value as string) ?? '');
  }, []);

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

    setShowEditorView(false);
  };

  const handleRemove = () => {
    dispatch(removeField({ dropZoneId: field.id, sectionId, rowId, columnId }));
  };

  return (
    <>
      {field.data && !showEditorView ? (
        <ComponentActionWithData
          handleEdit={toggleShowEditorView}
          handleRemove={handleRemove}
        >
          <Text fontSize="xl">{field.data.value}</Text>
        </ComponentActionWithData>
      ) : (
        <Box width="100%">
          <Box>
            <Input
              onChange={event => setValue(event.target.value)}
              type="text"
              placeholder="label"
              value={value}
            />
          </Box>
          <ComponentAction
            handleSave={handleSaveData}
            handleCancel={() => setShowEditorView(false)}
            handleRemove={handleRemove}
            hasData={!!field?.data?.value}
          />
        </Box>
      )}
    </>
  );
}