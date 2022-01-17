import { Component, Host, h, Prop, Listen, State } from '@stencil/core';

@Component({
  tag: 'cool-button',
  styleUrl: 'cool-button.css',
  shadow: false,
})
export class CoolButton {

  @Prop() lg?: boolean | string;

  @Prop() sm?: boolean | string;

  @Prop() outline?: boolean | string;

  @Prop() active?: boolean | string;

  @Prop() color?: string;

  @Prop() loading?: string;

  @State() disabled = false;

  get btnClass(): string {
    const active = this.isApply(this.active) ? 'active' : '';
    const outline = this.isApply(this.outline) ? 'outline-' : '';
    const size = this.getSize === 'md' ? '' : `btn-${this.getSize}`;
    const disabled = this.isApply(this.disabled) ? 'disabled' : '';
    return `btn ${size} ${disabled} btn-${outline}${this.color} ${active}`;
  }

  get getSize(): string {
    return this.isApply(this.lg) ? 'lg' : this.isApply(this.sm) ? 'sm' : 'md';
  }

  @Listen('click')
  handleClick() {
    alert(111);
    this.applyLoading();
  }

  applyLoading() {
    if (!this.isApply(this.disabled) && this.isApply(this.loading)) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  isApply(value: any): boolean {
    return !!value || (value !== undefined && value.toString() === '');
  }

  render() {
    return <Host tabindex="0" class={"btn " + this.btnClass}>
      <span class="spinner-border spinner-border-sm me-1"></span>
      {this.disabled}
    </Host>;
  }
}
