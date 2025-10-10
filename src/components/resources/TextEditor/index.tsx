'use client';

import { TextEditorContent, TextEditorMenu } from './components';
import { TextEditorProvider } from './providers';
import './styles/editor.scss';

export function TextEditor() {
  return (
    <TextEditorProvider>
      <div id="text-editor" className="bg-background -m-4 space-y-2 p-4">
        <TextEditorMenu />
        <TextEditorContent />
      </div>
    </TextEditorProvider>
  );
}
