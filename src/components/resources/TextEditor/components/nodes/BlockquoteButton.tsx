import { useEditorState } from '@tiptap/react';
import { QuoteIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function BlockquoteButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canBlockquote:
          ctx.editor.can().chain().toggleBlockquote().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={QuoteIcon}
      isActive={editorState.isBlockquote}
      canExecute={editorState.canBlockquote}
      onExecute={() => editor.chain().focus().toggleBlockquote().run()}
    />
  );
}
