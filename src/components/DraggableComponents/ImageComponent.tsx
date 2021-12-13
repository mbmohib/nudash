import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ComponentActionWithData, ImageUploadComponent } from '..';
import { useDispatch, useSectionMeta } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices';
import { DraggableItem } from '../../types';

export default function ImageComponent({ field }: { field: DraggableItem }) {
  const { sectionId, rowId, columnId } = useSectionMeta();
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (field.data && field.data.url) {
      setImageUrl(field.data && field.data.url);
    }
  }, [field.data]);

  const handleSaveData = (url: string) => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          value: 'default alt',
          url,
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
          <ImageUploadComponent
            handleUpload={handleSaveData}
            handleRemove={handleRemove}
          />
        </Box>
      )}
    </>
  );
}
