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

    present(): Observable<any> {
        this.instance.present();
        return this.subject.asObservable();
    }

    send(data?: any) {
        this.subject.next(data);
    }

    dismiss(datas?: any) {
        this.instance.dismiss();
        this.subject.next(datas);
    }

    destroy(datas?: any) {
        this.ref.destroy();
        this.dom.parentElement.removeChild(this.dom);
        this.subject.next(datas);
        this.subject.complete();
    }
}
