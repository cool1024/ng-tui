import { Component } from '@angular/core';
import { ComponentHandleService } from 'projects/ng-tui/src/tui-core/component-creator/handle.service';

@Component({
  template: ` <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button
          type="button"
          class="btn-close"
          (click)="handle.close()"
        ></button>
      </div>
      <div class="modal-body">
        <input [(ngModel)]="data" type="text" class="form-control" />
        <input [(ngModel)]="data" type="text" class="form-control" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button (click)="closePage()" type="button" class="btn btn-primary">
          Save changes
        </button>
      </div>
    </div>
  </div>`,
})
export class Modal {
  data = '32321';
  constructor(public handle: ComponentHandleService) {}

  closePage(): void {
    this.handle.close('你好');
  }
}
