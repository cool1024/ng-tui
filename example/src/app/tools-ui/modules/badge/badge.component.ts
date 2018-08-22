import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: `ts-badge`,
    template: `
        <span class="mr-2 mb-2 badge badge-{{color}} badge-pill p-2 badge-mark text-white">
            {{label||''}}
            <span (click)="closeHandle.emit()" class="iconfont icon-delete align-top pointer"></span>
        </span>`,
    exportAs: 'tsBadge'
})
export class BadgeComponent extends BaseTheme {

    @Input() label: string;

    @Output() closeHandle = new EventEmitter<void>();

    constructor(private configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
    }
}
