import { LucideProps } from 'lucide-react';
import {
  Dispatch,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  SetStateAction,
} from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';

interface ToolbarDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
  canExecute: boolean;
  content?: ReactNode;
  footer?: ReactNode;
}

export const ToolbarDialog = ({
  open,
  setOpen,
  title,
  description,
  icon: Icon,
  isActive,
  canExecute,
  content,
  footer,
}: ToolbarDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant={isActive ? 'default' : 'outline'}
          size="icon-sm"
          disabled={!canExecute}
        >
          <Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader hidden={!title && !description}>
          <DialogTitle hidden={!title}>{title}</DialogTitle>
          <DialogDescription hidden={!description}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>{content}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
