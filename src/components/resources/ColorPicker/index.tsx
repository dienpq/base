'use client';

import { BanIcon, ChevronRightIcon, PaletteIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  buttonVariants,
} from '@/components/ui';
import { cn } from '@/lib/utils';

import { COLOR_DATA_DEFAULT } from './constants';

function ColorPicker({
  value = 'initial',
  onChange,
  children,
  ...props
}: React.ComponentProps<'input'>) {
  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [recentColors, setRecentColors] = useState<
    { name: string; value: string }[]
  >([]);

  useEffect(() => {
    const colors = localStorage.getItem('recentColors');
    if (colors) {
      setRecentColors(JSON.parse(colors));
    }
  }, []);

  useEffect(() => {
    if (value && value !== 'initial') {
      setRecentColors((prev) => {
        const exist = prev.find((item) => item.value === value);
        let newColors = [];
        if (exist) {
          newColors = [exist, ...prev.filter((item) => item.value !== value)];
        } else {
          newColors = [{ name: String(value), value: String(value) }, ...prev];
        }
        if (newColors.length > 5) {
          newColors = newColors.slice(0, 5);
        }
        localStorage.setItem('recentColors', JSON.stringify(newColors));
        return newColors;
      });
    }
  }, [value]);

  return (
    <Popover open={open || focus} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children || (
          <Button
            variant="outline"
            size="icon"
            style={{ color: value?.toString() ?? 'initial' }}
          >
            <PaletteIcon />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="relative min-w-max space-y-2">
        <div className="relative">
          <input
            id="colorPicker"
            type="color"
            className="absolute -right-2 bottom-1/2 h-0 w-0 opacity-0"
            onChange={onChange}
            onFocus={() => setFocus(true)}
            {...props}
          />
          <label
            htmlFor="colorPicker"
            className={cn(
              'w-full cursor-pointer',
              buttonVariants({ variant: 'outline' }),
            )}
          >
            Customize
            <ChevronRightIcon className="size-4" />
          </label>
        </div>
        <Separator />

        <div className="grid grid-cols-[repeat(10,1fr)] gap-1">
          <Button
            size="icon"
            className={cn('h-6 w-6 bg-transparent hover:bg-transparent')}
            onClick={() =>
              onChange?.({
                target: { value: 'initial' },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <BanIcon className="text-primary h-5 w-5" />
          </Button>
          {recentColors.map((item) => (
            <Button
              key={item.name}
              style={{ backgroundColor: item.value }}
              size="icon"
              className={cn(
                'border-muted h-6 w-6 border',
                item.value === value && 'border-primary',
              )}
              onClick={() =>
                onChange?.({
                  target: { value: item.value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          ))}
        </div>
        <Separator />
        <div className="grid grid-cols-[repeat(10,1fr)] gap-1">
          {COLOR_DATA_DEFAULT.map((item) => (
            <Button
              key={item.name}
              style={{ backgroundColor: item.value }}
              size="icon"
              className={cn(
                'border-muted h-6 w-6 border',
                item.value === value && 'border-primary',
              )}
              onClick={() =>
                onChange?.({
                  target: { value: item.value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { ColorPicker };
