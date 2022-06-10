import 'scss/TextEditor.scss';

import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TextEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>testest</p>`,
  });

  return <EditorContent editor={editor} />;
};

export default TextEditor;
