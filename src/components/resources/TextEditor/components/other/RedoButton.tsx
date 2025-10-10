import { useEditorState } from '@tiptap/react';
import { Redo2Icon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function RedoButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canRedo: ctx.editor.can().chain().focus().redo().run(),
      };
    },
  });

  return (
    <ToolbarButton
      icon={Redo2Icon}
      isActive={false}
      canExecute={editorState.canRedo}
      onExecute={() => editor.chain().focus().redo().run()}
    />
  );
}
