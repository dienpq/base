import { useEditorState } from '@tiptap/react';
import { SuperscriptIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function SuperscriptButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isSuperscript: ctx.editor.isActive('superscript') ?? false,
        canSuperscript:
          ctx.editor.can().chain().toggleSuperscript().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={SuperscriptIcon}
      isActive={editorState.isSuperscript}
      canExecute={editorState.canSuperscript}
      onExecute={() => editor.chain().focus().toggleSuperscript().run()}
    />
  );
}
