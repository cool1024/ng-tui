import { Component } from '@angular/core';
import { GlobalService } from '../../../../cores/services';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent {

    diySelects = [
        {
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/71.jpg"> Jane`,
            text: 'Jane',
            value: 1
        },
        {
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/72.jpg"> Rose`,
            text: 'Rose',
            value: 2
        },
        {
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/73.jpg"> Revern`,
            text: 'Revern',
            value: 3
        },
        {
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/74.jpg"> Alis`,
            text: 'Alis',
            value: 4
        }
    ];

    selectValue = 'Brussels';

    selectValues = [1, 2];

    constructor(public global: GlobalService) { }
}
