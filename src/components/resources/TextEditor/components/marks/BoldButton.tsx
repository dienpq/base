import { useEditorState } from '@tiptap/react';
import { BoldIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function BoldButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={BoldIcon}
      isActive={editorState.isBold}
      canExecute={editorState.canBold}
      onExecute={() => editor.chain().focus().toggleBold().run()}
    />
  );
}
