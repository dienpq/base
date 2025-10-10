import { useEditorState } from '@tiptap/react';
import { BaselineIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ColorPicker } from '@/components/resources/ColorPicker';
import { Button } from '@/components/ui';

import { useTextEditor } from '../../providers';

export function ColorPopover() {
  const { editor } = useTextEditor();
  const [value, setValue] = useState<string>('');

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        value: ctx.editor.getAttributes('textStyle').color ?? '#000',
        isColor: ctx.editor.isActive('textStyle', { color: '' }) ?? false,
        canColor: ctx.editor.can().chain().setColor(value.trim()).run(),
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
    <ColorPicker
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (e.target.value === 'initial') {
          editor.chain().focus().unsetColor().run();
        } else {
          editor.chain().focus().setColor(e.target.value).run();
        }
      }}
    >
      <Button
        variant="outline"
        disabled={!editorState.canColor}
        size="icon-sm"
        style={{ color: value?.toString() ?? 'initial' }}
      >
        <BaselineIcon />
      </Button>
    </ColorPicker>
  );
}
