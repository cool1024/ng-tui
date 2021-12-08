export interface StatusText {
  default?: string | [];
  transition?: string | [];
  active?: string | [];
}

export const HoverStatus = {
  Default: 'default',
  Hover: 'transition',
  Active: 'active',
};
