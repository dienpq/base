import { ChevronDownIcon, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui';
import { cn } from '@/lib';

type ItemType = {
  label?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  isActive?: boolean;
  canExecute: boolean;
  onExecute?: () => void;
  subItems?: ItemType[];
};

interface ToolbarDropdownProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  canActivate: boolean;
  items: ItemType[];
}

export const ToolbarDropdown = ({
  icon: Icon,
  canActivate,
  items,
}: ToolbarDropdownProps) => {
  const itemActive = items.find((item) => item.isActive);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={!canActivate}>
          {itemActive ? (
            itemActive.icon ? (
              <itemActive.icon />
            ) : (
              itemActive?.label
            )
          ) : (
            <Icon />
          )}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-max gap-2">
        {items.map(
          (
            { label, icon: Icon, isActive, canExecute, onExecute, subItems },
            index,
          ) =>
            !subItems ? (
              <DropdownMenuItem
                key={index}
                className={cn(
                  isActive &&
                    'bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                )}
                disabled={!canExecute}
                onClick={onExecute}
              >
                {label && Icon ? (
                  <>
                    <Icon />
                    <span>{label}</span>
                  </>
                ) : Icon ? (
                  <Icon />
                ) : (
                  label || ''
                )}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>
                  {label && Icon ? (
                    <>
                      <Icon />
                      <span>{label}</span>
                    </>
                  ) : Icon ? (
                    <Icon />
                  ) : (
                    label || ''
                  )}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="min-w-min">
                    {subItems.map((subItem, subIndex) => (
                      <DropdownMenuItem
                        key={subIndex}
                        className={cn(
                          'py-2',
                          subItem.isActive &&
                            'bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                        )}
                        disabled={!subItem.canExecute}
                        onClick={() => subItem.onExecute?.()}
                      >
                        {subItem.label && subItem.icon ? (
                          <>
                            <subItem.icon />
                            <span>{subItem.label}</span>
                          </>
                        ) : subItem.icon ? (
                          <subItem.icon />
                        ) : (
                          subItem.label || ''
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
