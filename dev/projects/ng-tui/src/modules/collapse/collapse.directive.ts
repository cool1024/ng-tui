import {
  Directive,
  ElementRef,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { TUI_CONST } from '../../tui-core/const';
import { Toggle } from '../../tui-core/interface/toggle.interface';

const DISPLY = TUI_CONST.BOOTSTRAP.CLASS.DISPLAY;

@Directive({
  selector: '*[tsCollapse]',
  exportAs: 'tsCollapse',
})
export class CollapseDirective implements AfterViewInit, OnChanges, Toggle {
  @Input() open: boolean;

  @Output() openChange = new EventEmitter<boolean>();

  private pad!: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.open = false;
  }

  ngOnChanges(): void {
    this.updateCollapseShow();
  }

  ngAfterViewInit(): void {
    this.pad = this.elementRef.nativeElement;
    this.updateCollapseShow();
  }

  updateCollapseShow(): void {
    if (this.pad) {
      this.open
        ? this.pad.classList.remove(DISPLY.NONE)
        : this.pad.classList.add(DISPLY.NONE);
    }
  }

  toggle(): void {
    this.open = !this.open;
    this.updateCollapseShow();
    this.openChange.emit(this.open);
  }
}
