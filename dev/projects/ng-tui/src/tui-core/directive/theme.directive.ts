import { Input, Directive } from '@angular/core';

@Directive()
export class ThemeDirective {
  @Input() lg?: boolean | string;

  @Input() sm?: boolean | string;

  @Input() color?: string;

  @Input() outline?: boolean | string;

  @Input() active?: boolean | string;

  @Input() vertical?: boolean | string;

  get textClass(): string {
    return `text-${this.color}`;
  }

  get bgClass(): string {
    return `bg-${this.color}`;
  }

  get bgHoverClass(): string {
    return `bg-${this.color}-hover`;
  }

  get bgWithTextClass(): string {
    return `bg-${this.color}-light text-${this.color}`;
  }

  get getSize(): string {
    return this.isApply(this.lg) ? 'lg' : this.isApply(this.sm) ? 'sm' : 'md';
  }

  get btnClass(): string {
    const active = this.isApply(this.active) ? 'active' : '';
    const outline = this.isApply(this.outline) ? 'outline-' : '';
    const size = this.getSize === 'md' ? '' : `btn-${this.getSize}`;
    return `btn ${size} btn-${outline}${this.color} ${active}`;
  }

  get needVertical(): boolean {
    return this.isApply(this.vertical);
  }

  isApply(value: any): boolean {
    return !!value || (value !== undefined && value.toString() === '');
  }

  applyStyle(value: boolean, className: string): string {
    return value ? className : '';
  }
}
