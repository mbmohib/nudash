import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ComponentActionWithData, ImageUpload } from '..';
import { useDispatch, useSectionMeta } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices';
import { DraggableItem, Image as ImageType } from '../../types';

export default function ImageComponent({ field }: { field: DraggableItem }) {
  const { sectionId, rowId, columnId } = useSectionMeta();
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const dispatch = useDispatch();

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
          <Image src={imageUrl} />
        </ComponentActionWithData>
      ) : (
        <Box width="full">
          <ImageUpload handleSaveData={handleSaveData} />
        </Box>
      )}
    </>
  );
}
