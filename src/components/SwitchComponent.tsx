import { Box, Flex, Grid, Input, Switch, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { ComponentAction, ComponentActionWithData } from '.';
import { useDispatch, useSection, useToggle } from '../hooks';
import { removeField, saveFieldData } from '../store/sectionSlice';
import { FieldProps } from '../types';

export default function SwitchComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const [value, setValue] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('');
  const dispatch = useDispatch();
  const [showEditorView, toggleShowEditorView, setShowEditorView] = useToggle();

  const handleSaveData = () => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          isChecked: value,
          label,
        },
      }),
    );
  };

  const handleSwitchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          isChecked: event.target.checked,
          label,
        },
      }),
    );
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
          <Flex alignItems="center" gridGap="2">
            <Text>{field.data.label}: </Text>
            <Switch
              size="md"
              onChange={handleSwitchValue}
              isChecked={!!field.data.isChecked}
            />
          </Flex>
        </ComponentActionWithData>
      ) : (
        <Box>
          <Grid
            gridTemplateColumns="2fr 2fr"
            gap="2"
            width="100%"
            alignItems="center"
          >
            <Input
              type="text"
              placeholder="Add label"
              onChange={event => setLabel(event.target.value)}
              value={label}
            />
            <Switch
              size="md"
              onChange={event => setValue(event.target.checked)}
            />
          </Grid>
          <ComponentAction
            handleSave={handleSaveData}
            handleCancel={() => setShowEditorView(false)}
            handleRemove={handleRemove}
            hasData={!!field?.data?.isChecked}
          />
        </Box>
      )}
    </>
  );
}