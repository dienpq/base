import { useEditorState } from '@tiptap/react';
import { ListIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function BulletListButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        canBulletList:
          ctx.editor.can().chain().toggleBulletList().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={ListIcon}
      isActive={editorState.isBulletList}
      canExecute={editorState.canBulletList}
      onExecute={() => editor.chain().focus().toggleBulletList().run()}
    />
  );
}
