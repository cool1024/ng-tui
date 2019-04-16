import { Component, Input } from '@angular/core';

@Component({
    selector: `ts-table-load`,
    exportAs: 'tsTableLoad',
    template: `
    <div *ngIf="display" class="table-loader h-100 w-100 position-absolute left top d-flex">
        <div class="d-flex align-self-center justify-content-center text-center w-100">
            <div class="dot-animate"></div>
        </div>
    </div>`
})
export class TableLoadComponent {

    @Input() display: boolean;

    constructor() {
        this.display = false;
    }
}
