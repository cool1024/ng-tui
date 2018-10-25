import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Badge } from './badge.interface';

@Component({
    selector: `ts-badges`,
    template: `
            <ts-badge
                *ngFor="let badge of badges;index as i"
                [label]="badge.badgeLabel"
                [color]="badge.badgeColor"
                (closeHandle)="removeBadge(badge,i)">
            </ts-badge>`,
    exportAs: 'tsBadges'
})
export class BadgesComponent {

    @Input() badges: Badge[];

    @Output() closeHandle = new EventEmitter<Badge>(false);

    removeBadge(badge: Badge, index: number) {
        this.closeHandle.emit(badge);
        this.badges.splice(index, 1);
    }
}
