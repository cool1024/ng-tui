import { ComponentRef } from '@angular/core';
import { TUIComponent } from './component.interface';
import { Subject, Observable } from 'rxjs';

export class ComponentHandle {

    ref: ComponentRef<TUIComponent>;

    dom: HTMLElement;

    private subject = new Subject<any>();

    get instance(): any {
        return this.ref.instance;
    }

    open(): Observable<any> {
        return this.present();
    }

    present(): Observable<any> {
        this.instance.present();
        return this.subject.asObservable();
    }

    getObs(): Observable<any> {
        return this.subject.asObservable();
    }

    send(data?: any) {
        this.subject.next(data);
    }

    close(data?: any) {
        this.destroy(data);
    }

    dismiss(data?: any) {
        this.instance.dismiss();
        this.subject.next(data);
    }

    destroy(data?: any) {
        this.instance.destroy();
        this.ref.destroy();
        try {
            this.dom.parentElement && this.dom.parentElement.removeChild(this.dom);
        } catch (e) {
            console.error(e);
        }
        this.subject.next(data);
        this.subject.complete();
    }
}
