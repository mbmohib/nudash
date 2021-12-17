import { Box } from '@chakra-ui/react';

import { ImageUpload } from '..';
import { useDispatch, useSectionMeta } from '../../hooks';
import { removeData, removeField, saveFieldData } from '../../store/slices';
import { DraggableItem, Image as ImageType } from '../../types';

export default function ImageComponent({ field }: { field: DraggableItem }) {
  const { sectionId, rowId, columnId } = useSectionMeta();
  const dispatch = useDispatch();

  const handleSaveData = (image: ImageType) => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          value: image.alt,
          url: image.url,
        },
      }),
    );
  };

  const handleRemove = () => {
    dispatch(removeField({ dropZoneId: field.id, sectionId, rowId, columnId }));
  };

  const handleRemoveImage = () => {
    dispatch(removeData({ dropZoneId: field.id, sectionId, rowId, columnId }));
  };

  return (
    <Box width="full">
      <ImageUpload
        src={field?.data?.url}
        handleEdit={handleRemoveImage}
        handleRemove={handleRemove}
        handleUpload={handleSaveData}
      />
    </Box>
  );
}
