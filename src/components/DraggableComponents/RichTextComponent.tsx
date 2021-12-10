import { Box } from '@chakra-ui/react';
import { useRef } from 'react';

import { ComponentAction, ComponentActionWithData, RichText } from '..';
import { useDispatch, useSectionMeta, useToggle } from '../../hooks';
import { removeField, saveFieldData } from '../../store/slices/page.slice';
import { DraggableItem, EditorBlock } from '../../types';

interface EditorRef {
  handleSave: () => { blocks: EditorBlock; html: string };
}

export default function RichTextComponent({ field }: { field: DraggableItem }) {
  const { sectionId, rowId, columnId } = useSectionMeta();
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
          <Box bg="secondary.400">
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
