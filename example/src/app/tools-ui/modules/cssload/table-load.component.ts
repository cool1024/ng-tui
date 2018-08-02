import { Component, OnInit, Input } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: `ts-table-load`,
    exportAs: 'tsTableLoad',
    template: `
    <div *ngIf="display" class="table-loader h-100 w-100 position-absolute left top d-flex">
        <div class="align-self-center text-center w-100 {{textClass}}">
            <i tsIcon="loading" class="fa-spin" style="font-size:2rem"></i>
            <p *ngIf="label">{{label}}</p>
        </div>
    </div>`
})
export class TableLoadComponent extends BaseTheme {

    @Input() label: string;

    @Input() display: boolean;

    constructor(private configService: ConfigService) {
        super();
        this.label = '';
        this.display = false;
        this.color = configService.config.defaultColor;
    }

    present() { this.display = false; }

    dismiss() { this.display = true; }
}
