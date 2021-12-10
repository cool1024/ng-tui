import { Size } from '../../tui-core/interface/view.interface';

export class DropMenuItem {
  get hasIcon(): boolean {
    return !!this.icon;
  }

  get isTitle(): boolean {
    return this.type === DropMenuItemType.TITLE;
  }

  get isItem(): boolean {
    return this.type === DropMenuItemType.ITEM;
  }

  get isLine(): boolean {
    return this.type === DropMenuItemType.LINE;
  }

  get isImage(): boolean {
    return this.type === DropMenuItemType.IMAGE;
  }

  constructor(
    public title?: string,
    public icon?: string,
    public value?: any,
    public size?: Size,
    public type?: DropMenuItemType
  ) {}

  public static title(title: string, icon: string = ''): DropMenuItem {
    return new DropMenuItem(title, icon, null, null, DropMenuItemType.TITLE);
  }

  public static label(title: string, icon: string = ''): DropMenuItem {
    return new DropMenuItem(title, icon, title, null, DropMenuItemType.ITEM);
  }

  public static item(
    title: string,
    value: any,
    icon: string = ''
  ): DropMenuItem {
    return new DropMenuItem(title, icon, value, null, DropMenuItemType.ITEM);
  }

  public static split(): DropMenuItem {
    return new DropMenuItem('', '', '', null, DropMenuItemType.LINE);
  }

  public static image(
    title: string,
    src: string,
    value: any,
    size: Size
  ): DropMenuItem {
    return new DropMenuItem(title, src, value, size, DropMenuItemType.IMAGE);
  }
}

export enum DropMenuItemType {
  TITLE,
  ITEM,
  LINE,
  IMAGE,
}
