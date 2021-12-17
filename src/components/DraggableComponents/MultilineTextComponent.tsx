import {
  Box,
  FormControl,
  FormErrorMessage,
  Text,
  Textarea,
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
    value: yup.string().required('Please enter text'),
  })
  .required();

export default function ButtonComponent({ field }: { field: DraggableItem }) {
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
        <ComponentAction
          handleEdit={toggleShowEditorView}
          handleRemove={handleRemove}
        >
          <Text>{field.data.value}</Text>
        </ComponentAction>
      ) : (
        <Box mt="2" width="100%">
          <form onSubmit={handleSubmit(handleSaveData)}>
            <FormControl isInvalid={!!errors.value}>
              <Textarea
                {...register('value')}
                type="text"
                placeholder="Write text here.."
              />
              <FormErrorMessage>
                {errors.value && errors.value.message}
              </FormErrorMessage>
            </FormControl>
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
