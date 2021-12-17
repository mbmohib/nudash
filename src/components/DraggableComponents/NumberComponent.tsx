import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
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
    value: yup
      .number()
      .required('Please enter number')
      .typeError('Please enter number'),
  })
  .required();

export default function NumberComponent({ field }: { field: DraggableItem }) {
  const { sectionId, rowId, columnId } = useSectionMeta();
  const dispatch = useDispatch();
  const [showEditorView, toggleShowEditorView] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: field?.data?.value,
    },
  });
  const handleSaveData = ({ value }: { value: string }) => {
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
          <form onSubmit={handleSubmit(handleSaveData)}>
            <Box>
              <FormControl isInvalid={!!errors.value}>
                <Input
                  type="text"
                  placeholder="label"
                  id="value"
                  {...register('value')}
                />
                <FormErrorMessage>
                  {errors.value && errors.value.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
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
