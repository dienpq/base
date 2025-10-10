import { useEditorState } from '@tiptap/react';
import { PaintBucketIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ColorPicker } from '@/components/resources/ColorPicker';
import { Button } from '@/components/ui';

import { useTextEditor } from '../../providers';

export function BackgroundColorPopover() {
  const { editor } = useTextEditor();
  const [value, setValue] = useState<string>('');

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        value:
          ctx.editor.getAttributes('textStyle').backgroundColor ?? 'initial',
        isBackgroundColor:
          ctx.editor.isActive('textStyle', { backgroundColor: '' }) ?? false,
        canBackgroundColor: ctx.editor
          .can()
          .chain()
          .setBackgroundColor(value.trim())
          .run(),
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
          editor.chain().focus().unsetBackgroundColor().run();
        } else {
          editor.chain().focus().setBackgroundColor(e.target.value).run();
        }
      }}
    >
      <Button
        variant="outline"
        disabled={!editorState.canBackgroundColor}
        size="icon-sm"
        style={{ color: value?.toString() ?? 'initial' }}
      >
        <PaintBucketIcon />
      </Button>
    </ColorPicker>
  );
}
