import { Box, Image } from '@chakra-ui/react';

import { FileUpload } from '.';
import { useDispatch, useSection } from '../hooks';
import { saveFieldData } from '../store/sectionSlice';
import { FieldProps, FileType } from '../types';

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();

  const handleSaveData = (file: FileType) => {
    dispatch(
      saveFieldData({
        dropZoneId: field.id,
        sectionId,
        rowId,
        columnId,
        data: {
          src: file.preview,
        },
      }),
    );
  };

  return (
    <>
      {field.data ? (
        <Image src={field.data.src as string} />
      ) : (
        <Box>
          <FileUpload handleUpload={handleSaveData} />
        </Box>
      )}
    </>
  );
}
