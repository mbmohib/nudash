import { Box } from '@chakra-ui/react';
import { useRef } from 'react';

import { ComponentAction, ComponentActionWithData, RichText } from '.';
import { useDispatch, useSection, useToggle } from '../hooks';
import { removeField, saveFieldData } from '../store/sectionSlice';
import { FieldProps } from '../types';

interface EditorRef {
  handleSave: () => string;
}

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const editorRef = useRef<EditorRef>(null);
  const [showEditorView, toggleShowEditorView, setShowEditorView] = useToggle();

  const handleSaveData = async () => {
    let data = '';
    if (editorRef.current) {
      data = await editorRef.current.handleSave();

      dispatch(
        saveFieldData({
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
          <Box
            dangerouslySetInnerHTML={{ __html: field.data?.html as string }}
          ></Box>
        </ComponentActionWithData>
      ) : (
        <Box width="100%">
          <Box bg="secondary400">
            <RichText ref={editorRef} />
          </Box>
          <ComponentAction
            handleSave={handleSaveData}
            handleCancel={() => setShowEditorView(false)}
            handleRemove={handleRemove}
            hasData={!!field?.data?.isChecked}
          />
        </Box>
      )}
    </>
  );
}
