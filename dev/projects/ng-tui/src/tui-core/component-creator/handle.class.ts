import { ComponentRef } from '@angular/core';
import { TUIComponent } from './component.interface';
import { Subject, Observable } from 'rxjs';

export class ComponentHandle {
  private componentRef: ComponentRef<TUIComponent>;

  private subject = new Subject<any>();

  private parent?: ComponentHandle;

  tmpDom!: HTMLElement;

  get instance(): TUIComponent {
    return this.componentRef.instance;
  }

  get dom(): HTMLElement {
    return this.componentRef.location.nativeElement;
  }

  get parentDom(): HTMLElement {
    return this.parent.dom;
  }

  setParent(parent: ComponentHandle): void {
    this.parent = parent;
  }

  setRef(componentRef: ComponentRef<TUIComponent>): void {
    this.componentRef = componentRef;
  }

  getObs(): Observable<any> {
    return this.subject.asObservable();
  }

  send(data?: any): void {
    this.subject.next(data);
  }

  present(): Observable<any> {
    this.instance.tuiOnPresent?.();
    this.parent?.present();
    return this.subject.asObservable();
  }

  close(data?: any): void {
    this.destroy(data);
  }

  dismiss(data?: any): void {
    this.instance.tuiOnDismiss?.();
    this.subject.next(data);
    this.parent?.dismiss();
  }

  destroy(data?: any): void {
    // this.instance.tuiOnClose?.();
    this.subject.next(data);
    this.subject.complete();
    this.componentRef.destroy();
    this.subject.unsubscribe();
    this.parent?.destroy();
  }
}
