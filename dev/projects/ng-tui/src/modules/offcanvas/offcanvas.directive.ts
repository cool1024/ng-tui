import { Component, HostListener, Input } from '@angular/core';
import { OffcanvasOptions, OffcanvasService } from './offcanvas.service';
@Component({
  selector: '*[tsOffcanvas]'
})
export class OffcanvasDirective {
  @Input()
  tsOffcanvas!: OffcanvasOptions;

  @HostListener('click')
  handleClick(): void {
    this.offcanvas.create(this.tsOffcanvas.content!, this.tsOffcanvas).present();
  }

  constructor(private offcanvas: OffcanvasService) { }
}
