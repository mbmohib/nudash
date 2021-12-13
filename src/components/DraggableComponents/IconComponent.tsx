import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ComponentActionWithData, ImageUploadComponent } from '..';
import { useDispatch, useSectionMeta } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices';
import { DraggableItem } from '../../types';

export default function IconComponent({ field }: { field: DraggableItem }) {
  const dispatch = useDispatch();
  const { sectionId, rowId, columnId } = useSectionMeta();
  const [imageUrl, setImageUrl] = useState<string | undefined>('');

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
          <ImageUploadComponent
            placeholder="Drag 'n' drop icon here, or click to select icon"
            handleRemove={handleEdit}
            handleUpload={handleSaveData}
          />
        </Box>
      )}
    </>
  );
}
