import { useEditorState } from '@tiptap/react';
import {
  Link2Icon,
  Link2OffIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button, Input } from '@/components/ui';

import { useTextEditor } from '../../providers';
import { ToolbarPopover } from '../common';

export function LinkPopover() {
  const { editor } = useTextEditor();

  const [value, setValue] = useState<string>('');

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isLink: ctx.editor.isActive('link') ?? false,
        canLink: ctx.editor.can().chain().setLink({ href: '' }).run(),
        value: ctx.editor.getAttributes('link').href ?? '',
      };
    },
  });

  useEffect(() => {
    if (editorState.value) {
      setValue(editorState.value.toString());
    } else {
      setValue('');
    }
  }, [editorState]);

  return (
    <ToolbarPopover
      icon={Link2Icon}
      isActive={editorState.isLink}
      canExecute={editorState.canLink}
      content={
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button variant="secondary" size="icon" disabled={!value}>
              <Link href={value} target="_blank" rel="noreferrer">
                <SquareArrowOutUpRightIcon />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!editorState.isLink}
              onClick={() =>
                editor.chain().focus().extendMarkRange('link').unsetLink().run()
              }
            >
              <Link2OffIcon />
            </Button>
          </div>
          <Button
            disabled={!value}
            onClick={() =>
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: value })
                .run()
            }
          >
            Save
          </Button>
        </div>
      }
    />
  );
}
