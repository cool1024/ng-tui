import { Injectable } from '@angular/core';
import { ComponentService } from '../../tui-core/component-creator/component.service';
import { skipWhile } from 'rxjs/operators';
import { ToggleDirective } from '../../tui-core/directive/toggle.directive';
import { DropMenuItem } from '../dropdown/drop-menu.class';
import { MenuView } from './menu.view';
import { TUI_CONST } from '../../tui-core/const';
import { ConfigService } from '../../tui-core/service/config.service';

@Injectable()
export class MenuService {
  constructor(
    private cmpService: ComponentService,
    private csf: ConfigService
  ) {}

  showMenu(
    toggle: ToggleDirective,
    items: Array<string | DropMenuItem>,
    options?: MenuOptions
  ) {
    const handle = this.cmpService.create(MenuView);
    const view = handle.instance as MenuView;
    view.toggle = toggle;
    view.handle = handle;
    view.items = items.map<DropMenuItem>((e) => {
      if (e) {
        if (typeof e === 'string') {
          return DropMenuItem.item(e, e, null);
        } else {
          return e;
        }
      } else {
        return DropMenuItem.split();
      }
    });
    Object.assign(
      handle.instance,
      {
        offsetX: 0,
        offsetY: 0,
        position: TUI_CONST.POSITION.BOTTOM,
        minWidth: 0,
        animation: TUI_CONST.ANIMATE_CSS.ANIMATION.FadeIn,
        zIndex: '9999',
        color: this.csf.config.defaultColor,
      },
      options || {}
    );
    return handle.present().pipe(skipWhile((data) => data === undefined));
  }
}

export interface MenuOptions {
  position?: string;
  offsetX?: number;
  offsetY?: number;
  minWidth?: number;
  animation?: string;
  zIndex?: string;
  color?: string;
}
