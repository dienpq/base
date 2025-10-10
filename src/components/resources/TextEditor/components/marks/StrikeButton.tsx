import { useEditorState } from '@tiptap/react';
import { StrikethroughIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function StrikeButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={StrikethroughIcon}
      isActive={editorState.isStrike}
      canExecute={editorState.canStrike}
      onExecute={() => editor.chain().focus().toggleStrike().run()}
    />
  );
}
