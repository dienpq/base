import { useEditorState } from '@tiptap/react';
import { ItalicIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function ItalicButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={ItalicIcon}
      isActive={editorState.isItalic}
      canExecute={editorState.canItalic}
      onExecute={() => editor.chain().focus().toggleItalic().run()}
    />
  );
}
