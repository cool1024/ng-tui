import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  constructor() {}

  doSubmit(btn: any): void {
    // close animation after 3s
    timer(3000).subscribe(() => {
      btn.complete();
    });
  }
}
