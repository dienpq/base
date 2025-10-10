import { EyeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  Separator,
} from '@/components/ui';

import { useTextEditor } from '../../providers';

export function PreviewDialog() {
  const { editor } = useTextEditor();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm" disabled={isFullscreen}>
          <EyeIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex !h-[calc(100vh-2rem)] flex-col sm:max-w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle>Preview document</DialogTitle>
          <DialogDescription>
            This is how your content will look when published.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ScrollArea>
          <div
            className="text-editor--content"
            dangerouslySetInnerHTML={{
              __html: editor.getHTML(),
            }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
