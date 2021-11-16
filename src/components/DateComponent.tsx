import { Box, Grid, Input, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useState } from 'react';

import { ComponentAction, DatePicker } from '.';
import { useDispatch, useSection } from '../hooks';
import { handleFieldData } from '../store/sectionSlice';
import { FieldProps } from '../types';

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const [label, setLabel] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const handleSaveData = () => {
    dispatch(
      handleFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          label,
          date: new Date(date).toISOString(),
        },
      }),
    );
  };

  return (
    <>
      {field.data ? (
        <>
          <Text>{field.data.label}:</Text>
          <Text mr="2">
            {format(new Date(field.data.date as Date), 'dd/MM/yyyy')}
          </Text>
        </>
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
          <ComponentAction handleSave={handleSaveData} />
        </Box>
      )}
    </>
  );
}
