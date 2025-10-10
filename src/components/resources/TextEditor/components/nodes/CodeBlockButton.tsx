import { useEditorState } from '@tiptap/react';
import { CodeIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function CodeBlockButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        canCodeBlock: ctx.editor.can().chain().toggleCodeBlock().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={CodeIcon}
      isActive={editorState.isCodeBlock}
      canExecute={editorState.canCodeBlock}
      onExecute={() => editor.chain().focus().toggleCodeBlock().run()}
    />
  );
}
