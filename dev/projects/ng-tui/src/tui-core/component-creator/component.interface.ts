export interface TUIComponent {
  tuiOnPresent?(): void;
  tuiOnDismiss?(): void;
  tuiOnClose?(): void;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
