import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { ViewDirective } from '../../tui-core/component-creator/view.directive';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ToggleDirective } from '../../tui-core/directive/toggle.directive';
import { DropMenuItem, DropMenuItemType } from '../dropdown/drop-menu.class';

@Component({
  templateUrl: './menu.view.html',
})
export class MenuView
  extends ThemeDirective
  implements TUIComponent, AfterViewInit
{
  @ViewChild(ViewDirective)
  menuView: ViewDirective;

  toggle!: ToggleDirective;

  handle!: ComponentHandle;

  items: DropMenuItem[] = [];

  position: string;
  zIndex: string;
  offsetX: number;
  offsetY: number;
  minWidth: number;
  animation: string;

  type = DropMenuItemType;

  ngAfterViewInit(): void {
    console.log(this.menuView);
    this.menuView.toggle(this.toggle);
  }

  handleClick(i: number): void {
    this.handle.send(i);
  }

  tuiOnPresent(): void {}
  tuiOnDismiss(): void {}
  tuiOnClose(): void {}
}
