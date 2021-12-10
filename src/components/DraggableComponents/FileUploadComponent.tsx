import { Box, Image } from '@chakra-ui/react';

import { FileUpload } from '..';
import { useDispatch, useSectionMeta } from '../../hooks';
import { saveFieldData } from '../../store/slices/page';
import { DraggableItem, FileType } from '../../types';

export default function ButtonComponent({ field }: { field: DraggableItem }) {
  const { sectionId, rowId, columnId } = useSectionMeta();
  const dispatch = useDispatch();

  const handleSaveData = (file: FileType) => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          value: file.preview,
        },
      }),
    );
  };

  return (
    <>
      {field.data ? (
        <Image src={field.data.value as string} />
      ) : (
        <Box>
          <FileUpload handleUpload={handleSaveData} />
        </Box>
      )}
    </>
  );
}
