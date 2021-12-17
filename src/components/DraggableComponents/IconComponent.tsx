import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ComponentActionWithData, ImageUpload } from '..';
import { useDispatch, useSectionMeta } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices';
import { DraggableItem, Image as ImageType } from '../../types';

export default function IconComponent({ field }: { field: DraggableItem }) {
  const dispatch = useDispatch();
  const { sectionId, rowId, columnId } = useSectionMeta();
  const [imageUrl, setImageUrl] = useState<string | undefined>('');

  useEffect(() => {
    if (field.data && field.data.url) {
      setImageUrl(field.data && field.data.url);
    }
  }, [field.data]);

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

  const handleEdit = () => {
    setImageUrl(undefined);
  };

  return (
    <>
      {imageUrl ? (
        <ComponentActionWithData
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        >
          <Image
            borderRadius="lg"
            width="80px"
            padding="2"
            border="1px"
            borderColor="secondary.50"
            src={imageUrl}
          />
        </ComponentActionWithData>
      ) : (
        <Box width="full" mb="2">
          <ImageUpload handleUpload={handleSaveData} />
        </Box>
      )}
    </>
  );
}
