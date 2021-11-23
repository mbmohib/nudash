import { Box, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { ComponentAction, ComponentActionWithData } from '..';
import { useDispatch, useSectionMeta, useToggle } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices/page';
import { FieldProps } from '../../types';

export default function NumberComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSectionMeta();
  const dispatch = useDispatch();
  const [number, setNumber] = useState<string>('');
  const [showEditorView, toggleShowEditorView] = useToggle();

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

    toggleShowEditorView(false);
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
          <Text>{field.data.value}</Text>
        </ComponentActionWithData>
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
            handleCancel={() => toggleShowEditorView(false)}
            handleRemove={handleRemove}
            hasData={!!field?.data?.value}
          />
        </Box>
      )}
    </>
  );
}
