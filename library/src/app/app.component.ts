import { Component } from '@angular/core';
import { ItemTree } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    itemThrees: Array<ItemTree> = [
        {
            value: 0,
            text: '江西省',
            children: [
                {
                    value: 1,
                    text: '南昌市',
                },
                {
                    value: 2,
                    text: '赣州市',
                    children: [
                        {
                            value: 3,
                            text: '章贡区'
                        }
                    ]
                },
                {
                    value: 4,
                    text: '九江市',
                },
            ]
        },
        {
            value: 5,
            text: '上海市',
            children: [
                {
                    value: 6,
                    text: '市辖区',
                }
            ]
        },
    ];

    activeOptions: ItemTree[];

    value = [0, 2, 3];
}
