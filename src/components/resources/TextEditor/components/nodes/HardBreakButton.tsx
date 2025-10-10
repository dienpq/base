import { TextWrapIcon } from 'lucide-react';

import { useTextEditor } from '../../providers';
import { ToolbarButton } from '../common';

export function HardBreakButton() {
  const { editor } = useTextEditor();

  return (
    <ToolbarButton
      icon={TextWrapIcon}
      isActive={false}
      canExecute={true}
      onExecute={() => editor.chain().focus().setHardBreak().run()}
    />
  );
}
