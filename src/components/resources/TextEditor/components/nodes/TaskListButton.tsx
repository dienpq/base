import { useEditorState } from '@tiptap/react';
import { LayoutListIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function TaskListButton() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isTaskList: ctx.editor.isActive('taskList') ?? false,
        canTaskList: ctx.editor.can().chain().toggleTaskList().run() ?? false,
      };
    },
  });

  return (
    <ToolbarButton
      icon={LayoutListIcon}
      isActive={editorState.isTaskList}
      canExecute={editorState.canTaskList}
      onExecute={() => editor.chain().focus().toggleTaskList().run()}
    />
  );
}
