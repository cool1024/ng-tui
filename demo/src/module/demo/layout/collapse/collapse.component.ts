import { Component } from '@angular/core';

@Component({
    templateUrl: './collapse.component.html',
})
export class CollapseComponent {

    inputs = [
        ['auto', ' boolean', 'If true, all item will been closed except the active item'],
    ];
}