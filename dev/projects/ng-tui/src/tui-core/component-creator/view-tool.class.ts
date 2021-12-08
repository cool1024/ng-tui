import { Rect } from './component.interface';
import { ValueChangeListenerService } from '../service/value-listener.service';
import { Util } from '../util';

export class ViewTool {
  private obs: any;

  constructor(public toggleDom?: HTMLElement, public targetDom?: HTMLElement) {}

  clean(): void {
    this.obs &&
      new ValueChangeListenerService().getInstance().removeObs(this.obs);
  }

  autoPosition(offsetX: number = 0, offsetY: number = 0, size = false): void {
    if (!(this.toggleDom && this.targetDom)) {
      return;
    }
    const toggleDom = this.toggleDom;
    const targetDom = this.targetDom;
    // tslint:disable-next-line: no-unused-expression
    this.obs &&
      new ValueChangeListenerService().getInstance().removeObs(this.obs);
    this.obs = new ValueChangeListenerService()
      .getInstance()
      .observeClientRect(toggleDom, () => {
        const tRect = this.getRect(toggleDom);
        const mRect = this.getRect(targetDom);
        let top = tRect.y + offsetY + tRect.h;
        let left = tRect.x + offsetX;
        // 绝对不能超过下边界
        if (window.innerHeight < top + mRect.h) {
          top = window.innerHeight - mRect.h;
        }
        // 绝对不能超过右边界
        if (window.innerWidth < left + mRect.w) {
          left = window.innerWidth - mRect.w;
        }
        targetDom.style.top = Util.getStylePx(top);
        targetDom.style.left = Util.getStylePx(left);

        if (size) {
          targetDom.style.width = Util.getStylePx(tRect.w);
        }
      });
  }

  autoPositionBottom(
    offsetX: number = 0,
    offsetY: number = 0,
    size = false
  ): void {
    if (!(this.toggleDom && this.targetDom)) {
      return;
    }
    const toggleDom = this.toggleDom;
    const targetDom = this.targetDom;
    // tslint:disable-next-line: no-unused-expression
    this.obs &&
      new ValueChangeListenerService().getInstance().removeObs(this.obs);
    this.obs = new ValueChangeListenerService()
      .getInstance()
      .observeClientRect(toggleDom, () => {
        const tRect = this.getRect(toggleDom);
        targetDom.style.top = Util.getStylePx(tRect.y + offsetY + tRect.h);
        targetDom.style.left = Util.getStylePx(tRect.x + offsetX);
        if (size) {
          targetDom.style.width = Util.getStylePx(tRect.w);
        }
      });
  }

  autoPositionTop(
    offsetX: number = 0,
    offsetY: number = 0,
    size = false
  ): void {
    if (!(this.toggleDom && this.targetDom)) {
      return;
    }
    const toggleDom = this.toggleDom;
    const targetDom = this.targetDom;
    // tslint:disable-next-line: no-unused-expression
    this.obs &&
      new ValueChangeListenerService().getInstance().removeObs(this.obs);
    this.obs = new ValueChangeListenerService()
      .getInstance()
      .observeClientRect(toggleDom, () => {
        const tRect = this.getRect(toggleDom);
        const mRect = this.getRect(targetDom);
        targetDom.style.top = Util.getStylePx(tRect.y + offsetY - mRect.h);
        targetDom.style.left = Util.getStylePx(tRect.x + offsetX);
        if (size) {
          targetDom.style.width = Util.getStylePx(tRect.w);
        }
      });
  }

  getRect(dom: HTMLElement): Rect {
    const rect = dom.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
      w: rect.width,
      h: rect.height,
    };
  }
}
