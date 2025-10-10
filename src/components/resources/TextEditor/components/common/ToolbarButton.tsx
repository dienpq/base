import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Button } from '@/components/ui';

interface ToolbarButtonProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
  canExecute: boolean;
  onExecute: () => void;
}

export function ToolbarButton({
  icon: Icon,
  isActive,
  canExecute,
  onExecute,
}: ToolbarButtonProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="icon-sm"
      onClick={onExecute}
      disabled={!canExecute}
    >
      <Icon />
    </Button>
  );
}
