import {
  Directive,
  ElementRef,
  AfterViewInit,
  Input,
  HostListener,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Toggle } from '../interface/toggle.interface';
import { ToggleDirective } from '../directive/toggle.directive';
import { ViewTool } from './view-tool.class';
import { ThemeDirective } from '../directive/theme.directive';
import { TUI_CONST } from '../const';
import { Util } from '../util';

const POSITION = TUI_CONST.POSITION;
const DISPLAY = TUI_CONST.BOOTSTRAP.CLASS.DISPLAY;
const DISPLAY_POSITION = TUI_CONST.BOOTSTRAP.CLASS.POSITION;
const ANIMATE_CSS = TUI_CONST.ANIMATE_CSS;
const VIEW_KEYS = TUI_CONST.VIEW_KEYS;

@Directive({
  selector: `*[tsView]`,
  exportAs: 'tsView',
})
export class ViewDirective
  extends ThemeDirective
  implements AfterViewInit, OnDestroy, Toggle
{
  @Input() set tsView(position: string) {
    this.position = position || POSITION.AUTO;
  }
  @Input() position: string;
  @Input() offsetX: number;
  @Input() offsetY: number;
  @Input() fitWidth: boolean;
  @Output() displayChange = new EventEmitter<boolean>(true);

  get dom(): HTMLElement {
    return this.elementRef.nativeElement;
  }
  viewTool: ViewTool;
  isActive: boolean;

  autoHandle?: () => void;

  constructor(public elementRef: ElementRef) {
    super();
    this.isActive = false;
    this.fitWidth = false;
    this.viewTool = new ViewTool();
    this.offsetX = 0;
    this.offsetY = 0;
    this.position = POSITION.AUTO;
  }

  @HostListener('document:click', ['$event.target']) onDocumentClick(
    dom: HTMLElement
  ): void {
    if (this.viewTool.targetDom && this.viewTool.toggleDom) {
      if (this.viewTool.targetDom.contains(dom)) {
        // 如果触发点在自己内部
        dom.hasAttribute(VIEW_KEYS.CLOSE) &&
          dom.getAttribute(VIEW_KEYS.CLOSE) !== 'false' &&
          this.dismiss();
      } else if (this.viewTool.toggleDom.contains(dom)) {
        // 如果触发点在触发对象内部暂不做操作
      } else {
        // 如果触发点不在自己或者触发点那么关闭本视图
        dom.hasAttribute(VIEW_KEYS.HOLD) || this.dismiss();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.dom) {
      this.dom.classList.add(
        DISPLAY_POSITION.FIXED,
        DISPLAY.NONE,
        ANIMATE_CSS.PREFIX
      );
      this.dom.style.top = Util.getStylePx(0);
      this.dom.style.left = Util.getStylePx(0);
      this.viewTool.targetDom = this.dom;
      document.body.appendChild(this.dom);
      if (this.position === POSITION.AUTO) {
        this.autoHandle = () => {
          this.viewTool.autoPosition(this.offsetX, this.offsetY, this.fitWidth);
        };
        window.addEventListener('resize', this.autoHandle, false);
      }
    }
  }

  toggle(toggle: ToggleDirective): void {
    this.viewTool.toggleDom = toggle.dom;
    if (this.dom) {
      if (this.isActive) {
        this.dismiss();
      } else {
        this.dom.classList.remove(DISPLAY.NONE);
        this.dom.style.opacity = '0';
        if (this.position === POSITION.BOTTOM) {
          this.viewTool.autoPositionBottom(
            this.offsetX,
            this.offsetY,
            this.fitWidth
          );
        }
        if (this.position === POSITION.TOP) {
          this.viewTool.autoPositionTop(
            this.offsetX,
            this.offsetY,
            this.fitWidth
          );
        }
        if (this.position === POSITION.AUTO) {
          this.viewTool.autoPosition(this.offsetX, this.offsetY, this.fitWidth);
        }
        this.isActive = true;
        setTimeout(() => {
          this.dom.style.opacity = '1';
        }, 200);
      }
    }
    this.displayChange.emit(this.isActive);
  }

  dismiss(): void {
    if (this.isActive && this.dom) {
      this.dom.classList.add(DISPLAY.NONE);
      this.isActive = false;
      this.viewTool.clean();
    }
    this.displayChange.emit(this.isActive);
  }

  ngOnDestroy(): void {
    this.viewTool.clean();
    if (this.dom) {
      this.dom.parentNode && this.dom.parentNode.removeChild(this.dom);
      this.autoHandle && window.removeEventListener('resize', this.autoHandle);
    }
  }
}
