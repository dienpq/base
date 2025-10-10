import { useEditorState } from '@tiptap/react';
import { SubscriptIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function SubscriptButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isSubscript: ctx.editor.isActive('subscript') ?? false,
        canSubscript: ctx.editor.can().chain().toggleSubscript().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={SubscriptIcon}
      isActive={editorState.isSubscript}
      canExecute={editorState.canSubscript}
      onExecute={() => editor.chain().focus().toggleSubscript().run()}
    />
  );
}
