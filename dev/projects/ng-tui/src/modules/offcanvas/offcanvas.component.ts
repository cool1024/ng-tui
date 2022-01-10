import { Component } from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { TUI_CONST } from '../../tui-core/const';
const VISIBILITY = TUI_CONST.STYLE.VISIBILITY;
@Component({
  template: ` <div
      class="offcanvas offcanvas-{{ position }} show"
      [style.visibility]="visibility"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">{{ title }}</h5>
        <button
          (click)="handle.destroy()"
          type="button"
          class="btn-close text-reset"
        ></button>
      </div>
      <div class="offcanvas-body"></div>
    </div>
    <div
      (click)="handle.destroy()"
      class="offcanvas-backdrop fade show"
    ></div>`,
})
export class OffcanvasComponent implements TUIComponent {
  title!: string;
  handle!: ComponentHandle;
  position!: string;
  visibility = VISIBILITY.HIDDEN;
  tuiOnPresent(): void {
    this.visibility = VISIBILITY.VISABLE;
  }
  tuiOnDismiss(): void {
    this.visibility = VISIBILITY.HIDDEN;
  }
  tuiOnClose(): void {
    this.visibility = VISIBILITY.HIDDEN;
  }
}
