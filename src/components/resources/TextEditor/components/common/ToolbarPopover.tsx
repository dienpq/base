import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

interface ToolbarPopoverProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
  canExecute: boolean;
  content?: ReactNode;
}

export const ToolbarPopover = ({
  icon: Icon,
  isActive,
  canExecute,
  content,
}: ToolbarPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={isActive ? 'default' : 'outline'}
          size="icon-sm"
          disabled={!canExecute}
        >
          <Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex min-w-max gap-2 p-2">
        {content}
      </PopoverContent>
    </Popover>
  );
};
