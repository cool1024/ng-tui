import {
  Directive,
  Input,
  QueryList,
  ContentChildren,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ToggleDirective } from '../../tui-core/directive/toggle.directive';
import { Toggle } from '../../tui-core/interface/toggle.interface';
import { CollapseDirective } from './collapse.directive';

@Directive({
  selector: '*[tsCollapses]',
  exportAs: 'tsCollapses',
})
export class CollapsesDirective implements AfterViewInit, OnChanges, Toggle {
  @Input() auto: boolean;

  @ContentChildren(CollapseDirective, { descendants: true })
  collapses!: QueryList<CollapseDirective>;

  @ContentChildren(ToggleDirective, { descendants: true })
  toggles!: QueryList<ToggleDirective>;

  constructor() {
    this.auto = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    if (this.collapses) {
      const collapses = this.collapses.toArray();
      this.toggles.forEach((e, index) => {
        e.link = true;
        e.data = index;
        e.target = collapses[index];
        e.bind = this;
      });
    }
  }

  closeOther(index: number): void {
    this.collapses.forEach((e, i) => {
      if (i !== index && e.open) {
        e.toggle();
      }
    });
  }

  bind(toggle: ToggleDirective): void {}

  toggle(toggle: ToggleDirective): void {
    if (this.auto) {
      console.log(111111);
      this.closeOther(toggle.data);
    }
  }
}
