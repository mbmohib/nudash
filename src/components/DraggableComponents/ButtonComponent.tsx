import { Box, Button, Grid, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { ComponentAction, ComponentActionWithData } from '..';
import { useDispatch, useSectionMeta, useToggle } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices/page';
import { FieldProps } from '../../types';

export default function ButtonComponent({ field }: FieldProps) {
  const dispatch = useDispatch();
  const { sectionId, rowId, columnId } = useSectionMeta();
  const [label, setLabel] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [showEditorView, toggleShowEditorView] = useToggle();

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
          <Button mt="3" colorScheme="secondary">
            {field.data.label}
          </Button>
        </ComponentActionWithData>
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
            handleCancel={() => toggleShowEditorView(false)}
            handleRemove={handleRemove}
            hasData={!!field?.data?.value}
          />
        </Box>
      )}
    </>
  );
}
