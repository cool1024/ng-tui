import { Component, OnInit, Input } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';

@Component({
    selector: `ts-table-load`,
    exportAs: 'tsTableLoad',
    template: `
    <div *ngIf="display" class="h-100 w-100 ts-loading">
        <div class="ts-loading-dom text-center w-100 {{textClass}}">
            <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
            <p *ngIf="label">{{label}}</p>
        </div>
    </div>`,
    styles: [
        `.ts-loading{
            background-color:#ffffffb5;
            position: absolute;
            left:0;
            top:0;
        }
        .ts-loading-dom{
            position: absolute;
            left:0;
            top:40%;
        }
        `
    ]
})
export class TableLoadComponent extends BaseTheme {

    @Input() label: string;

    @Input() display: boolean;

    constructor() {
        super();
        this.label = '';
        this.display = false;
    }

    present() { this.display = false; }

    dismiss() { this.display = true; }
}
