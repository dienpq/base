import { useEditorState } from '@tiptap/react';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarDropdown } from '../common';

export function TextAlignDropdown() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const isCodeBlock = ctx.editor.isActive('codeBlock');
      const isMathBlock = ctx.editor.isActive('blockMath');
      return {
        canTextAlign: !isCodeBlock && !isMathBlock,
        isLeft: ctx.editor.isActive({ textAlign: 'left' }),
        isCenter: ctx.editor.isActive({ textAlign: 'center' }),
        isRight: ctx.editor.isActive({ textAlign: 'right' }),
        isJustify: ctx.editor.isActive({ textAlign: 'justify' }),
      };
    },
  });

  return (
    <ToolbarDropdown
      icon={AlignLeftIcon}
      canActivate={editorState.canTextAlign}
      items={[
        {
          icon: AlignLeftIcon,
          isActive: editorState.isLeft,
          canExecute: true,
          onExecute: () => editor.chain().focus().setTextAlign('left').run(),
        },
        {
          icon: AlignCenterIcon,
          isActive: editorState.isCenter,
          canExecute: true,
          onExecute: () => editor.chain().focus().setTextAlign('center').run(),
        },
        {
          icon: AlignRightIcon,
          isActive: editorState.isRight,
          canExecute: true,
          onExecute: () => editor.chain().focus().setTextAlign('right').run(),
        },
        {
          icon: AlignJustifyIcon,
          isActive: editorState.isJustify,
          canExecute: true,
          onExecute: () => editor.chain().focus().setTextAlign('justify').run(),
        },
      ]}
    />
  );
}
