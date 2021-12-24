import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Toggle } from '../interface/toggle.interface';

@Directive({
  selector: `*[tsToggle]`,
  exportAs: 'tsToggle',
})
export class ToggleDirective implements AfterViewInit {
  get dom(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  data: any;

  @Input() target?: Toggle;

  @Input() bind?: Toggle;

  @HostListener('click') onClick(): void {
    if (this.target && this.target.toggle) {
      this.target.toggle(this);
    }
  }

  constructor(public elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.bind && this.bind.bind) {
      this.bind.bind(this);
    }
  }
}
