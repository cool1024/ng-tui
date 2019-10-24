import { Input } from '@angular/core';

export class BaseTheme {

    @Input() lg: boolean;

    @Input() sm: boolean;

    @Input() color: string;

    @Input() outline: boolean;

    @Input() active: boolean;

    get textClass(): string {
        return `text-${this.color}`;
    }

    get bgClass(): string {
        return `bg-${this.color}`;
    }

    get bgWithTextClass(): string {
        return `bg-${this.color} text-white`;
    }

    get getSize(): string {
        return this.isApply(this.lg) ? 'lg' : (this.isApply(this.sm) ? 'sm' : 'md');
    }

    get btnClass(): string {
        const active = this.isApply(this.active) ? 'active' : '';
        const outline = this.isApply(this.outline) ? 'outline-' : '';
        const size = this.getSize === 'md' ? '' : `btn-${this.getSize}`;
        return `btn ${size} btn-${outline}${this.color} ${active}`;
    }

    isApply(value: any): boolean {
        return !!value || (value !== undefined && value.toString() === '');
    }
}
