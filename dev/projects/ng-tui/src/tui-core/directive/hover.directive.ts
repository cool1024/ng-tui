import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { StatusText, HoverStatus } from '../interface/status-value.interface';
import { Util } from '../util';

@Directive({
  selector: '*[tsHover]',
  exportAs: 'tsHover',
})
export class TsHoverDirective implements AfterViewInit {
  @Input()
  tsHover: StatusText = {};

  @Input()
  set hoverActive(active: boolean) {
    this.mHoverActive = active;
    this.updateElementClass(active ? HoverStatus.Active : HoverStatus.Default);
  }

  @Input()
  hoverStyle: { [key: string]: [string, string, string] } = {};

  @Output()
  hoverChange = new EventEmitter<boolean>(false);

  private mHoverActive?: boolean;

  public isHover = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseleave', ['$event'])
  leave($event: MouseEvent): void {
    this.isHover = false;
    this.updateElementClass(
      this.mHoverActive ? HoverStatus.Active : HoverStatus.Default
    );
    this.hoverChange.emit(false);
  }

  @HostListener('mouseenter', ['$event'])
  enter($event: MouseEvent): void {
    this.updateElementClass(HoverStatus.Hover);
    this.isHover = true;
    this.hoverChange.emit(true);
  }

  private updateElementClass(status: string): void {
    const dom: HTMLElement = this.elementRef.nativeElement;
    if (dom) {
      dom.classList.remove(...Util.getStringArray(this.tsHover.default));
      dom.classList.remove(...Util.getStringArray(this.tsHover.transition));
      dom.classList.remove(...Util.getStringArray(this.tsHover.active));
      if (status === HoverStatus.Default) {
        dom.classList.add(...Util.getStringArray(this.tsHover.default));
      }
      if (status === HoverStatus.Hover) {
        dom.classList.add(...Util.getStringArray(this.tsHover.transition));
      }
      if (status === HoverStatus.Active) {
        dom.classList.add(...Util.getStringArray(this.tsHover.active));
      }
    }
  }

  ngAfterViewInit(): void {
    this.updateElementClass(HoverStatus.Default);
  }
}
