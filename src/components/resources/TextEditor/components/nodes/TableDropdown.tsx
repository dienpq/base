import { useEditorState } from '@tiptap/react';
import {
  ColumnsIcon,
  PlusIcon,
  RowsIcon,
  Table2Icon,
  TableCellsMergeIcon,
  TableCellsSplitIcon,
  TableIcon,
  TrashIcon,
} from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarDropdown } from '../common';

export function TableDropdown() {
  const { editor } = useTextEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canInsertTable: ctx.editor.can().insertTable() ?? false,
        canAddRowBefore: ctx.editor.can().addRowBefore() ?? false,
        canAddRowAfter: ctx.editor.can().addRowAfter() ?? false,
        canDeleteRow: ctx.editor.can().deleteRow() ?? false,
        canAddColumnBefore: ctx.editor.can().addColumnBefore() ?? false,
        canAddColumnAfter: ctx.editor.can().addColumnAfter() ?? false,
        canDeleteColumn: ctx.editor.can().deleteColumn() ?? false,
        canMergeCells: ctx.editor.can().mergeCells() ?? false,
        canSplitCell: ctx.editor.can().splitCell() ?? false,
        canToggleHeaderColumn: ctx.editor.can().toggleHeaderColumn() ?? false,
        canToggleHeaderRow: ctx.editor.can().toggleHeaderRow() ?? false,
        canToggleHeaderCell: ctx.editor.can().toggleHeaderCell() ?? false,
        canDeleteTable: ctx.editor.can().deleteTable() ?? false,
      };
    },
  });

  return (
    <ToolbarDropdown
      icon={TableIcon}
      canActivate={editorState.canInsertTable}
      items={[
        {
          label: 'Insert table',
          icon: PlusIcon,
          canExecute: editorState.canInsertTable,
          onExecute: () =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run(),
        },
        {
          label: 'Row',
          icon: RowsIcon,
          canExecute:
            editorState.canAddRowBefore ||
            editorState.canAddRowAfter ||
            editorState.canDeleteRow,
          subItems: [
            {
              label: 'Add before',
              canExecute: editorState.canAddRowBefore,
              onExecute: () => editor.chain().focus().addRowBefore().run(),
            },
            {
              label: 'Add after',
              canExecute: editorState.canAddRowAfter,
              onExecute: () => editor.chain().focus().addRowAfter().run(),
            },
            {
              label: 'Delete',
              canExecute: editorState.canDeleteRow,
              onExecute: () => editor.chain().focus().deleteRow().run(),
            },
          ],
        },
        {
          label: 'Column',
          icon: ColumnsIcon,
          canExecute:
            editorState.canAddColumnBefore ||
            editorState.canAddColumnAfter ||
            editorState.canDeleteColumn,
          subItems: [
            {
              label: 'Add before',
              canExecute: editorState.canAddColumnBefore,
              onExecute: () => editor.chain().focus().addColumnBefore().run(),
            },
            {
              label: 'Add after',
              canExecute: editorState.canAddColumnAfter,
              onExecute: () => editor.chain().focus().addColumnAfter().run(),
            },
            {
              label: 'Delete',
              canExecute: editorState.canDeleteColumn,
              onExecute: () => editor.chain().focus().deleteColumn().run(),
            },
          ],
        },
        {
          label: 'Merge cells',
          icon: TableCellsMergeIcon,
          canExecute: editorState.canMergeCells,
          onExecute: () => editor.chain().focus().mergeCells().run(),
        },
        {
          label: 'Split cell',
          icon: TableCellsSplitIcon,
          canExecute: editorState.canSplitCell,
          onExecute: () => editor.chain().focus().splitCell().run(),
        },
        {
          label: 'Toggle header',
          icon: Table2Icon,
          canExecute:
            editorState.canToggleHeaderColumn ||
            editorState.canToggleHeaderRow ||
            editorState.canToggleHeaderCell,
          subItems: [
            {
              label: 'Column',
              canExecute: editorState.canToggleHeaderColumn,
              onExecute: () =>
                editor.chain().focus().toggleHeaderColumn().run(),
            },
            {
              label: 'Row',
              canExecute: editorState.canToggleHeaderRow,
              onExecute: () => editor.chain().focus().toggleHeaderRow().run(),
            },
            {
              label: 'Cell',
              canExecute: editorState.canToggleHeaderCell,
              onExecute: () => editor.chain().focus().toggleHeaderCell().run(),
            },
          ],
        },
        {
          label: 'Delete table',
          icon: TrashIcon,
          canExecute: editorState.canDeleteTable,
          onExecute: () => editor.chain().focus().deleteTable().run(),
        },
      ]}
    />
  );
}
