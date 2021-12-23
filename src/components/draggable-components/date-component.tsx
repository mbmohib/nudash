import { Box, Grid, Input, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useState } from 'react';

import { ComponentAction, ComponentButtons, DatePicker } from '..';
import { useDispatch, useSectionMeta, useToggle } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices';
import { DraggableItem } from '../../types';

export default function ButtonComponent({ field }: { field: DraggableItem }) {
  const { sectionId, rowId, columnId } = useSectionMeta();
  const dispatch = useDispatch();
  const [label, setLabel] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
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
          value: new Date(date).toISOString(),
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
        <ComponentAction
          handleEdit={toggleShowEditorView}
          handleRemove={handleRemove}
        >
          <Text fontWeight="semibold">{field.data.label}:</Text>
          <Text ml="2">
            {format(new Date(field.data.value as Date), 'dd/MM/yyyy')}
          </Text>
        </ComponentAction>
      ) : (
        <Box>
          <Grid gridTemplateColumns="1fr 3fr" gap="2">
            <Input
              type="text"
              value={label}
              onChange={event => setLabel(event.target.value)}
            />
            <DatePicker
              selected={date}
              onChange={dateValue => setDate(dateValue as Date)}
            />
          </Grid>
          <ComponentButtons
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
