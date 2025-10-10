import { useEditorState } from '@tiptap/react';
import { CodeXmlIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function CodeButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={CodeXmlIcon}
      isActive={editorState.isCode}
      canExecute={editorState.canCode}
      onExecute={() => editor.chain().focus().toggleCode().run()}
    />
  );
}
