import { Component } from "@angular/core";
import {
  ComponentHandleService,
  ConfirmService,
  ModalService,
  ToastService,
} from "ng-tui";

@Component({
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  constructor(
    private modal: ModalService,
    private toast: ToastService,
    private confirm: ConfirmService
  ) {}

  showModal(): void {
    const param = {
      messageContent:
        "Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    };
    this.modal
      .create(SimpleModal, param)
      .present()
      .subscribe((res: string) => {
        this.toast.info("Message", res);
      });
  }

  showDialog(color: string): void {
    this.confirm
      .create("Dialog Title", `Type : ${color}`, { color })
      .subscribe((res: boolean) => {
        this.toast.create("Message", `Result : ${res}`, {
          color,
          timeout: -1,
          icon: color,
        });
      });
  }
}

@Component({
  templateUrl: "./simple.html",
})
// tslint:disable-next-line: component-class-suffix
export class SimpleModal {
  messageContent?: string;
  constructor(public handle: ComponentHandleService) {}
}
