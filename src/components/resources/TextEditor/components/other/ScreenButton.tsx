import { ExpandIcon, ShrinkIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui';

import { useResizeObserver } from '../../hooks';

export const ScreenButton = () => {
  const elementRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    elementRef.current = document.getElementById(
      'text-editor--menu',
    ) as HTMLElement;
  }, []);

  const { height = 0 } = useResizeObserver({
    ref: elementRef,
    box: 'border-box',
  });

  useEffect(() => {
    const textEditorInputElement =
      document.getElementById('text-editor--input');

    if (textEditorInputElement) {
      if (document.fullscreenElement) {
        textEditorInputElement.style.height = `calc(100vh - ${height}px)`;
      } else {
        textEditorInputElement.style.height = '';
      }
    }
  }, [height]);

  const toggleFullscreen = (): void => {
    const textEditorElement = document.getElementById('text-editor');
    const textEditorInputElement =
      document.getElementById('text-editor--input');

    if (textEditorElement && textEditorInputElement) {
      if (!document.fullscreenElement) {
        textEditorElement.requestFullscreen();
        textEditorInputElement.style.height = `calc(100vh - ${height}px)`;
      } else {
        document.exitFullscreen();
        textEditorInputElement.style.height = '';
      }
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleFullscreen}>
      {!!document.fullscreenElement ? <ShrinkIcon /> : <ExpandIcon />}
    </Button>
  );
};
