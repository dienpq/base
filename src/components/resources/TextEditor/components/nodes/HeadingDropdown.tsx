import { useEditorState } from '@tiptap/react';
import {
  CircleSlash2Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  PilcrowIcon,
} from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarDropdown } from '../common';

export function HeadingDropdown() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        canParagraph: ctx.editor.can().setParagraph() ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        canHeading1: ctx.editor.can().toggleHeading({ level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        canHeading2: ctx.editor.can().toggleHeading({ level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        canHeading3: ctx.editor.can().toggleHeading({ level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        canHeading4: ctx.editor.can().toggleHeading({ level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        canHeading5: ctx.editor.can().toggleHeading({ level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        canHeading6: ctx.editor.can().toggleHeading({ level: 6 }) ?? false,
      };
    },
  });

  return (
    <ToolbarDropdown
      icon={CircleSlash2Icon}
      canActivate={
        editorState.canParagraph ||
        editorState.canHeading1 ||
        editorState.canHeading2 ||
        editorState.canHeading3 ||
        editorState.canHeading4 ||
        editorState.canHeading5 ||
        editorState.canHeading6
      }
      items={[
        {
          label: 'Paragraph',
          icon: PilcrowIcon,
          isActive: editorState.isParagraph,
          canExecute: editorState.canParagraph,
          onExecute: () => editor.chain().focus().setParagraph().run(),
        },
        {
          label: 'Heading 1',
          icon: Heading1Icon,
          isActive: editorState.isHeading1,
          canExecute: editorState.canHeading1,
          onExecute: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          label: 'Heading 2',
          icon: Heading2Icon,
          isActive: editorState.isHeading2,
          canExecute: true,
          onExecute: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          label: 'Heading 3',
          icon: Heading3Icon,
          isActive: editorState.isHeading3,
          canExecute: editorState.canHeading3,
          onExecute: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
          label: 'Heading 4',
          icon: Heading4Icon,
          isActive: editorState.isHeading4,
          canExecute: editorState.canHeading4,
          onExecute: () =>
            editor.chain().focus().toggleHeading({ level: 4 }).run(),
        },
        {
          label: 'Heading 5',
          icon: Heading5Icon,
          isActive: editorState.isHeading5,
          canExecute: editorState.canHeading5,
          onExecute: () =>
            editor.chain().focus().toggleHeading({ level: 5 }).run(),
        },
        {
          label: 'Heading 6',
          icon: Heading6Icon,
          isActive: editorState.isHeading6,
          canExecute: editorState.canHeading6,
          onExecute: () =>
            editor.chain().focus().toggleHeading({ level: 6 }).run(),
        },
      ]}
    />
  );
}
