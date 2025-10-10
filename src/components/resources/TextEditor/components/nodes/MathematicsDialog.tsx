import { useEditorState } from '@tiptap/react';
import 'katex/dist/katex.min.css';
import { SigmaIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button, Input } from '@/components/ui';

import { useTextEditor } from '../../providers';
import { ToolbarDialog } from '../common';

export function MathematicsDialog() {
  const { editor, openMathDialog, setOpenMathDialog } = useTextEditor();
  const [value, setValue] = useState<string>('');

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        value:
          ctx.editor.getAttributes('inlineMath').latex ||
          ctx.editor.getAttributes('blockMath').latex ||
          '',
        isActiveInline: ctx.editor.isActive('inlineMath'),
        isActiveBlock: ctx.editor.isActive('blockMath'),
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

  const runAndClose = (cb: () => void) => {
    cb();
    setValue('');
    setOpenMathDialog(false);
  };

  return (
    <>
      <ToolbarDialog
        open={openMathDialog}
        setOpen={setOpenMathDialog}
        title="Mathematics"
        description="Insert mathematical expressions using LaTeX syntax."
        icon={SigmaIcon}
        isActive={editorState.isActiveInline || editorState.isActiveBlock}
        canExecute={true}
        content={
          <Input
            value={value}
            placeholder="Enter LaTeX code here"
            onChange={(e) => setValue(e.target.value)}
          />
        }
        footer={
          <div className="flex w-full justify-between gap-2">
            <Button
              variant="destructive"
              onClick={() =>
                editorState.isActiveInline
                  ? editor.chain().deleteInlineMath().focus().run()
                  : editorState.isActiveBlock
                    ? editor.chain().deleteBlockMath().focus().run()
                    : {}
              }
              disabled={
                !(editorState.isActiveInline || editorState.isActiveBlock)
              }
            >
              Remove
            </Button>

            {!editorState.isActiveInline && !editorState.isActiveBlock && (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    runAndClose(() =>
                      editor
                        .chain()
                        .insertInlineMath({ latex: value })
                        .focus()
                        .run(),
                    );
                  }}
                  disabled={!value.trim()}
                >
                  Insert inline
                </Button>
                <Button
                  onClick={() =>
                    runAndClose(() =>
                      editor
                        .chain()
                        .insertBlockMath({ latex: value })
                        .focus()
                        .run(),
                    )
                  }
                  disabled={!value.trim()}
                >
                  Insert block
                </Button>
              </div>
            )}

            {editorState.isActiveInline && (
              <Button
                onClick={() =>
                  runAndClose(() =>
                    editor
                      .chain()
                      .updateInlineMath({ latex: value })
                      .focus()
                      .run(),
                  )
                }
                disabled={!value.trim()}
              >
                Update inline
              </Button>
            )}
            {editorState.isActiveBlock && (
              <Button
                onClick={() =>
                  runAndClose(() =>
                    editor
                      .chain()
                      .updateBlockMath({ latex: value })
                      .focus()
                      .run(),
                  )
                }
                disabled={!value.trim()}
              >
                Update block
              </Button>
            )}
          </div>
        }
      />
    </>
  );
}
