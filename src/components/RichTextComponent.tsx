import { Box } from '@chakra-ui/react';
import { useRef } from 'react';

import { ComponentAction, RichText } from '.';
import { useDispatch, useSection } from '../hooks';
import { handleFieldData } from '../store/sectionSlice';
import { FieldProps } from '../types';

interface EditorRef {
  handleSave: () => string;
}

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const editorRef = useRef<EditorRef>(null);

  const handleSaveData = async () => {
    let data = '';
    if (editorRef.current) {
      data = await editorRef.current.handleSave();

      dispatch(
        handleFieldData({
          dropZoneId: field.id,
          sectionId,
          rowId,
          columnId,
          data: {
            html: data,
          },
        }),
      );
    }
  };

  return (
    <>
      {field.data ? (
        <Box
          dangerouslySetInnerHTML={{ __html: field.data?.html as string }}
        ></Box>
      ) : (
        <Box width="100%">
          <Box bg="secondary400">
            <RichText ref={editorRef} />
          </Box>
          <ComponentAction handleSave={handleSaveData} />
        </Box>
      )}
    </>
  );
}
