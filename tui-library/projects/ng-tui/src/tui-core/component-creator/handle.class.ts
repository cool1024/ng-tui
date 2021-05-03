import { ComponentRef } from '@angular/core';
import { TUIComponent } from './component.interface';
import { Subject, Observable } from 'rxjs';

export class ComponentHandle {
    ref!: ComponentRef<TUIComponent>;

    dom!: HTMLElement;

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

    send(data?: any): void {
        this.subject.next(data);
    }

    close(data?: any): void {
        this.destroy(data);
    }

    dismiss(data?: any): void {
        this.instance.dismiss();
        this.subject.next(data);
    }

    destroy(data?: any): void {
        this.instance.destroy();
        this.ref.destroy();
        try {
            // tslint:disable-next-line: no-unused-expression
            this.dom.parentElement && this.dom.parentElement.removeChild(this.dom);
        } catch (e) {
            console.error(e);
        }
        this.subject.next(data);
        this.subject.complete();
    }
}
