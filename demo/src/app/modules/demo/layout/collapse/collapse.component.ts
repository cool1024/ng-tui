import { Component } from '@angular/core';

@Component({
    templateUrl: './collapse.component.html',
})
export class CollapseComponent {

    inputs = [
        ['color', ' string', `color name, such as 'success', 'primary', etc.`],
        ['items', ' Item[]', 'tab items'],
        ['activeIndex', 'number', 'active item index, default value is 0']
    ];

    outputs = [
        ['tabChange', 'number', 'you can get the active item index when tab change']
    ];
}