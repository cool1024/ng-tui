import { ComponentRef } from '@angular/core';
import { WindowComponent } from './window.component';
import { Subject, Observable } from 'rxjs';

export class WindowHandle {

    ref: ComponentRef<WindowComponent>;

    instance: any;

    index: number;

    subject = new Subject<any>();

    constructor() { }

    present(): Observable<any> {
        this.ref.instance.present();
        return this.subject.asObservable();
    }

    send(data?: any) {
        this.subject.next(data);
    }

    close(datas?: any) {
        this.send(datas);
        this.ref.destroy();
    }

    getIndex(): number {
        return this.index;
    }
}
