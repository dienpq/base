import { useEditorState } from '@tiptap/react';
import { MinusIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function HorizontalRuleButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isHorizontalRule: ctx.editor.isActive('horizontalRule') ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={MinusIcon}
      isActive={editorState.isHorizontalRule}
      canExecute={true}
      onExecute={() => editor.chain().focus().setHorizontalRule().run()}
    />
  );
}
