import { Card, CardContent, Separator } from '@/components/ui';

import {
  BoldButton,
  CodeButton,
  HighlightButton,
  ItalicButton,
  LinkPopover,
  StrikeButton,
  SubscriptButton,
  SuperscriptButton,
  UnderlineButton,
} from './marks';
import {
  BackgroundColorPopover,
  BlockquoteButton,
  BulletListButton,
  CodeBlockButton,
  ColorPopover,
  HardBreakButton,
  HeadingDropdown,
  HorizontalRuleButton,
  ImagePopover,
  MathematicsDialog,
  OrderedListButton,
  TableDropdown,
  TaskListButton,
  TextAlignDropdown,
} from './nodes';
import {
  ClearMarksButton,
  PreviewDialog,
  RedoButton,
  ScreenButton,
  UndoButton,
} from './other';

export function TextEditorMenu() {
  return (
    <Card id="text-editor--menu">
      <CardContent className="flex flex-wrap items-center gap-2">
        <BoldButton />
        <ItalicButton />
        <StrikeButton />
        <UnderlineButton />
        <CodeButton />
        <HighlightButton />
        <LinkPopover />
        <SubscriptButton />
        <SuperscriptButton />

        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-6"
        />

        <BlockquoteButton />
        <BulletListButton />
        <OrderedListButton />
        <CodeBlockButton />
        <HardBreakButton />
        <HeadingDropdown />
        <HorizontalRuleButton />
        <ImagePopover />
        <TableDropdown />
        <ColorPopover />
        <BackgroundColorPopover />
        <TextAlignDropdown />
        <MathematicsDialog />
        <TaskListButton />

        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-6"
        />

        <ClearMarksButton />
        <UndoButton />
        <RedoButton />
        <PreviewDialog />
        <ScreenButton />
      </CardContent>
    </Card>
  );
}
