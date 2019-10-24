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

    send(data?: any) {
        this.subject.next(data);
    }

    close(datas?: any) {
        this.destroy(datas);
    }

    dismiss(datas?: any) {
        this.instance.dismiss();
        this.subject.next(datas);
    }

    destroy(datas?: any) {
        this.instance.destroy();
        this.ref.destroy();
        try {
            this.dom.parentElement.removeChild(this.dom);
        } catch (e) {

        }
        this.subject.next(datas);
        this.subject.complete();
    }
}
