import { useEditorState } from '@tiptap/react';
import { RemoveFormattingIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function ClearMarksButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canUnset: ctx.editor.can().chain().focus().unsetAllMarks().run(),
      };
    },
  });

  return (
    <ToolbarButton
      icon={RemoveFormattingIcon}
      isActive={false}
      canExecute={editorState.canUnset}
      onExecute={() => editor.chain().focus().unsetAllMarks().run()}
    />
  );
}
