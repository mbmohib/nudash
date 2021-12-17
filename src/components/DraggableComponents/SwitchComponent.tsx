import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
  Switch,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ComponentActionWithData, ComponentButtons } from '..';
import { useDispatch, useSectionMeta, useToggle } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices';
import { DraggableItem } from '../../types';

const schema = yup
  .object({
    value: yup.boolean().required('Please enter value'),
    label: yup.string().required('Please enter label'),
  })
  .required();

export default function SwitchComponent({ field }: { field: DraggableItem }) {
  const { sectionId, rowId, columnId } = useSectionMeta();
  const dispatch = useDispatch();
  const [showEditorView, toggleShowEditorView] = useToggle();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: field?.data?.value ?? false,
      label: field?.data?.label,
    },
  });

  const handleSaveData = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => {
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

  const handleSwitchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('value', event.target.checked);
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
            <Text>{field.data.label}? </Text>
            <Text>{field.data.value ? 'Yes' : 'No'} </Text>
          </Flex>
        </ComponentActionWithData>
      ) : (
        <Box width="100%">
          <form onSubmit={handleSubmit(handleSaveData)}>
            <Grid
              gridTemplateColumns="2fr 2fr"
              gap="2"
              width="100%"
              alignItems="center"
            >
              <FormControl isInvalid={!!errors.label}>
                <Input
                  type="text"
                  placeholder="label"
                  id="label"
                  {...register('label')}
                />
                <FormErrorMessage>
                  {errors.label && errors.label.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.value}>
                <Switch
                  size="md"
                  {...register('value')}
                  onChange={handleSwitchValue}
                />
                <FormErrorMessage>
                  {errors.value && errors.value.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>
            <ComponentButtons
              handleCancel={() => toggleShowEditorView(false)}
              handleRemove={handleRemove}
              hasData={!!field?.data?.value}
            />
          </form>
        </Box>
      )}
    </>
  );
}
