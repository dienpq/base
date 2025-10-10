import { useEditorState } from '@tiptap/react';
import { ImageIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import { Button, Input, buttonVariants } from '@/components/ui';
import { cn } from '@/lib';

import { useTextEditor } from '../../providers';
import { ToolbarPopover } from '../common';

export function ImagePopover() {
  const { editor } = useTextEditor();
  const [value, setValue] = useState<string>('');

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isLink: ctx.editor.isActive('image') ?? false,
        canLink: ctx.editor.can().chain().setImage({ src: '' }).run(),
        value: ctx.editor.getAttributes('image').src ?? '',
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

  const handleUploadImage = async (file: File) => {
    try {
      const newFormData = new FormData();
      newFormData.append('image', file);
      // const response = await PublicService.uploadImage(newFormData);
      // if (response && response.path) {
      //   action?.(response.path);
      // }
    } catch (error) {
      console.error(error);
      const reader = new FileReader();
      reader.onloadend = () => {
        editor
          .chain()
          .focus()
          .setImage({ src: reader.result?.toString() || '' })
          .run();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUploadImage(file);
    }
  };

  return (
    <ToolbarPopover
      icon={ImageIcon}
      isActive={editorState.isLink}
      canExecute={editorState.canLink}
      content={
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button
              disabled={!value}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .setImage({ src: value?.toString() })
                  .run()
              }
            >
              Save
            </Button>
          </div>

          <input
            type="file"
            name="image"
            id="chooseImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <label htmlFor="chooseImage" className={cn(buttonVariants())}>
            Choose Image
          </label>
        </div>
      }
    />
  );
}
