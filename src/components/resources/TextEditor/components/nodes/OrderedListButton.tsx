import { useEditorState } from '@tiptap/react';
import { ListOrderedIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function OrderedListButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        canOrderedList:
          ctx.editor.can().chain().toggleOrderedList().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={ListOrderedIcon}
      isActive={editorState.isOrderedList}
      canExecute={editorState.canOrderedList}
      onExecute={() => editor.chain().focus().toggleOrderedList().run()}
    />
  );
}
