import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ComponentAction, ComponentButtons } from '..';
import { useDispatch, useSectionMeta, useToggle } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices';
import { DraggableItem } from '../../types';

const schema = yup
  .object({
    value: yup
      .string()
      .url('Please enter valid url')
      .required('Please enter url'),
    label: yup.string().required('Please enter label'),
  })
  .required();

export default function ButtonComponent({ field }: { field: DraggableItem }) {
  const dispatch = useDispatch();
  const { sectionId, rowId, columnId } = useSectionMeta();
  const [showEditorView, toggleShowEditorView] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: field?.data?.value,
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
          <Button mt="3" colorScheme="secondary">
            {field.data.label}
          </Button>
        </ComponentAction>
      ) : (
        <Box width="100%">
          <form onSubmit={handleSubmit(handleSaveData)}>
            <Grid gridTemplateColumns="2fr 3fr" gap="1" width="100%">
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
                <Input
                  type="text"
                  placeholder="url"
                  id="value"
                  {...register('value')}
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
