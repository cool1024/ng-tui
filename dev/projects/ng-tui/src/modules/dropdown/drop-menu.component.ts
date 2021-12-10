import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TUI_CONST } from '../../tui-core/const';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { Item } from '../../tui-core/interface/item.interface';
import { ConfigService } from '../../tui-core/service/config.service';
import { DropMenuItem, DropMenuItemType } from './drop-menu.class';

@Component({
  selector: 'ts-drop-menu',
  templateUrl: './drop-menu.html',
})
export class DropMenuComponent extends ThemeDirective {
  @Input() items: Array<DropMenuItem>;

  @Input() offsetX: number;

  @Input() offsetY: number;

  @Input() minWidth: number;

  @Input() zIndex: number;

  @Input() fitWidth: boolean;

  @Input() position: string;

  @Output() menuClick = new EventEmitter<Item>();

  itemList: Item[] = [];

  type = DropMenuItemType;

  constructor(csf: ConfigService) {
    super();
    this.color = csf.config.defaultColor;
    this.items = [];
    this.minWidth = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.zIndex = 9999;
    this.fitWidth = false;
    this.position = TUI_CONST.POSITION.BOTTOM;
  }

  handleClick(item: Item): void {
    this.menuClick.emit(item);
  }
}
