import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import edjsHTML from 'editorjs-html';
import React, { forwardRef, useImperativeHandle } from 'react';
import { createReactEditorJS } from 'react-editor-js';

interface TableParserProps {
  data: { content: [] };
}

interface CodeParserProps {
  data: { code: string };
}

function tableParser({ data }: TableParserProps) {
  const tableContent = data.content
    .map(
      (item: string[]) =>
        `<tr>
      ${item.map((td: string) => `<td>${td}</td>`).join('')}
    </tr>`,
    )
    .join('');

  return `<table> ${tableContent} </table>`;
}

function codeParser({ data }: CodeParserProps) {
  return `<pre><code>${data.code}</code></pre>`;
}

interface EditorJS {
  save: () => void;
  clear: () => void;
}

interface ReactEditorProps {
  defaultBlock?: string;
}

function RichText(
  { defaultBlock }: ReactEditorProps,
  ref: React.Ref<unknown> | undefined,
) {
  const editorJS = React.useRef<EditorJS | null>(null);
  const ReactEditorJS = createReactEditorJS();
  // const uploadFile = useUpload();

  const EDITOR_JS_TOOLS = {
    table: Table,
    list: List,
    code: Code,
    image: {
      class: Image,
      config: {
        /**
         * Custom uploader
         */
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          // async uploadByFile(file: File) {
          //   // return await uploadFile(file);
          // },
        },
      },
    },
    header: Header,
    quote: Quote,
    delimiter: Delimiter,
    inlineCode: InlineCode,
  };

  const handleInitialize = React.useCallback(instance => {
    editorJS.current = instance;
  }, []);

  const handleSave = async (): Promise<string> => {
    if (editorJS.current) {
      const savedData = await editorJS.current.save();
      const edjsParser = edjsHTML({ table: tableParser, code: codeParser });
      return edjsParser.parse(savedData).join('');
    }

    return '';
  };

  const resetEditor = () => {
    if (editorJS.current) {
      editorJS.current.clear();
    }
  };

  useImperativeHandle(ref, () => ({
    handleSave,
    resetEditor,
  }));

  return (
    <ReactEditorJS
      defaultBlock={defaultBlock}
      onInitialize={handleInitialize}
      tools={EDITOR_JS_TOOLS}
    />
  );
}

export default forwardRef(RichText);
