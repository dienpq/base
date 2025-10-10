import { useEditorState } from '@tiptap/react';
import { UnderlineIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function UnderlineButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={UnderlineIcon}
      isActive={editorState.isUnderline}
      canExecute={editorState.canUnderline}
      onExecute={() => editor.chain().focus().toggleUnderline().run()}
    />
  );
}
