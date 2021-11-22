import { Box } from '@chakra-ui/react';
import { useRef } from 'react';

import { ComponentAction, ComponentActionWithData, RichText } from '..';
import { useDispatch, useSection, useToggle } from '../../hooks';
import { removeField, saveFieldData } from '../../store/sectionSlice';
import { EditorBlock, FieldProps } from '../../types';

interface EditorRef {
  handleSave: () => { blocks: EditorBlock; html: string };
}

export default function ButtonComponent({ field }: FieldProps) {
  const { sectionId, rowId, columnId } = useSection();
  const dispatch = useDispatch();
  const editorRef = useRef<EditorRef>(null);
  const [showEditorView, toggleShowEditorView] = useToggle();

  const handleSaveData = async () => {
    if (editorRef.current) {
      const data = await editorRef.current.handleSave();

      dispatch(
        saveFieldData({
          dropZoneId: field.id,
          sectionId,
          rowId,
          columnId,
          data: {
            blocks: data.blocks,
            value: data.html,
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
            dangerouslySetInnerHTML={{ __html: field.data?.value as string }}
          ></Box>
        </ComponentActionWithData>
      ) : (
        <Box width="100%">
          <Box bg="secondary400">
            <RichText
              ref={editorRef}
              blocks={field.data?.blocks as EditorBlock}
            />
          </Box>
          <ComponentAction
            handleSave={handleSaveData}
            handleCancel={() => toggleShowEditorView(false)}
            handleRemove={handleRemove}
            hasData={!!field?.data?.blocks}
          />
        </Box>
      )}
    </>
  );
}
