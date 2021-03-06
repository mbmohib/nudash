import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Wrapper } from '../';

const EditorExtended = ({
  title,
  initialValue,
  handleEditorChange,
  ...rest
}) => {
  return (
    <Wrapper {...rest}>
      <Editor
        initialValue={initialValue}
        title={title}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
        }}
        onChange={handleEditorChange}
      />
    </Wrapper>
  );
};

export default EditorExtended;
