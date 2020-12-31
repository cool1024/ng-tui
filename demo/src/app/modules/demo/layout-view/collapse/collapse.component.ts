import { Component } from '@angular/core';

@Component({
    templateUrl: './collapse.component.html',
    styles: [
        `
        .image-view {
            position: relative;
            width: 100%;
            height: 0;
            font-size: 0;
            line-height: 0;
            padding: 56% 0 0;
        }
        .image-view img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }`
    ]
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