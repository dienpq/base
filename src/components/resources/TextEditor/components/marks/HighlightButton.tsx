import { useEditorState } from '@tiptap/react';
import { HighlighterIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function HighlightButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isHighlight: ctx.editor.isActive('highlight') ?? false,
        canHighlight: ctx.editor.can().chain().toggleHighlight().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={HighlighterIcon}
      isActive={editorState.isHighlight}
      canExecute={editorState.canHighlight}
      onExecute={() => editor.chain().focus().toggleHighlight().run()}
    />
  );
}
