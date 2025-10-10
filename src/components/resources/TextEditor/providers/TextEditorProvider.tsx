'use client';

import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Mathematics, migrateMathStrings } from '@tiptap/extension-mathematics';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TableKit } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { cn } from '@/lib';

type TextEditorContextType = {
  editor: Editor;
  openMathDialog: boolean;
  setOpenMathDialog: Dispatch<SetStateAction<boolean>>;
};

const TextEditorContext = createContext<TextEditorContextType | null>(null);

export function TextEditorProvider({ children }: { children: ReactNode }) {
  const [openMathDialog, setOpenMathDialog] = useState(false);

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit,
      Highlight,
      Link.configure({
        openOnClick: false,
      }),
      Subscript,
      Superscript,
      Image,
      TableKit.configure({
        table: { resizable: true },
      }),
      TextStyleKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      Typography,
      Mathematics.configure({
        blockOptions: {
          onClick: () => {
            setOpenMathDialog(true);
          },
        },
        inlineOptions: {
          onClick: () => {
            setOpenMathDialog(true);
          },
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    onCreate: ({ editor: currentEditor }) => {
      migrateMathStrings(currentEditor);
    },
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        id: 'text-editor--input',
        class: cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'h-[400px]',
        ),
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <TextEditorContext.Provider
      value={{
        editor,
        openMathDialog,
        setOpenMathDialog,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
}

export function useTextEditor() {
  const ctx = useContext(TextEditorContext);
  if (!ctx) {
    throw new Error('useTextEditor must be used inside TextEditorProvider');
  }
  return ctx;
}
