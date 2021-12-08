import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { TUI_CONST } from '../../tui-core/const';

const DISPLAY = TUI_CONST.BOOTSTRAP.CLASS.DISPLAY;

@Component({
  selector: 'ts-modal',
  template: `
    <div (click)="handleClose($event)" [class]="display">
      <div class="modal fade show d-block"></div>
      <div class="modal-backdrop fade show"></div>
    </div>
  `,
})
export class ModalComponent implements TUIComponent {
  handle!: ComponentHandle;
  display = DISPLAY.NONE;

  tuiOnPresent(): void {
    this.display = DISPLAY.BLOCK;
  }
  tuiOnDismiss(): void {
    this.display = DISPLAY.NONE;
  }
  tuiOnClose(): void {
    this.display = DISPLAY.NONE;
  }

  handleClose(event: any): void {
    const container = this.handle.parentDom.querySelector('.modal');
    if (event.target === container) {
      this.handle.destroy();
    }
  }
}
