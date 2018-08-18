
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmOptions } from './confirm.interface';


@Component({
    template: `
    <div #pad (click)="tryClose($event.target)" [class.show]="show"
        [class.d-block]="show" class="modal fade animated slideInUp" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i [ngClass]="'text-'+color" [tsIcon]="config.icon" ></i>
                        {{title}}
                    </h5>
                    <button (click)="dismiss()" type="button" class="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                <div class="modal-body">
                    <p>{{message}}</p>
                </div>
                <div class="modal-footer">
                    <button (click)="dismiss()" type="button" class="btn btn-white">{{config.cancelTitle}}</button>
                    <button (click)="confirm()" type="button" class="btn btn-{{color}}">{{config.okTitle}}</button>
                </div>
            </div>
        </div>
    </div>
    <div *ngIf="show" class="modal-backdrop fade show"></div>
  `
})
export class ConfirmComponent {

    @ViewChild('pad') modalPad: ElementRef;

    title: string;

    message: string;

    config: ConfirmOptions;

    handle: Subject<void>;

    show: boolean;

    color: string;

    constructor() {
        this.show = false;
        this.color = 'success';
    }

    tryClose(eventDom: HTMLElement) {
        if (eventDom === this.modalPad.nativeElement) {
            this.dismiss();
        }
    }

    dismiss() {
        this.show = false;
    }

    confirm() {
        this.handle.next();
        this.show = false;
    }

    play() {
        this.show = true;
    }

    updateHandle(): Observable<any> {
        this.handle = new Subject<void>();
        return this.handle.asObservable();
    }
}
