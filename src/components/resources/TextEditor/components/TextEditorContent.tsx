import { EditorContent } from '@tiptap/react';

import { useTextEditor } from '../providers';

export function TextEditorContent() {
  const { editor } = useTextEditor();

  return <EditorContent editor={editor} className="text-editor--content" />;
}
