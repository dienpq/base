import { useEditorState } from '@tiptap/react';
import { Undo2Icon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function UndoButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canUndo: ctx.editor.can().chain().focus().undo().run(),
      };
    },
  });

  return (
    <ToolbarButton
      icon={Undo2Icon}
      isActive={false}
      canExecute={editorState.canUndo}
      onExecute={() => editor.chain().focus().undo().run()}
    />
  );
}
