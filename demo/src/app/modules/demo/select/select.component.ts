import { Component } from '@angular/core';
import { Item, ItemTree, requestObject } from 'projects/ng-tui/src/public_api';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html'
})
export class SelectComponent {

    selectOptions: Item[] = [
        { text: 'Dark', value: 'dark' },
        { text: 'Primary', value: 'primary' },
        { text: 'Secondary', value: 'secondary' },
        { text: 'Success', value: 'success' },
        { text: 'Warning', value: 'warning' },
        { text: 'Danger', value: 'danger' },
    ];

    blockOptions: ItemTree[] = [
        {
            value: 1,
            text: 'Parent',
            children: [
                {
                    value: 2,
                    text: 'Child',
                }
            ]
        }
    ];

    selectValue = 'dark';

    selectValues = ['dark'];

    blockValue = [];

    constructor() {
        // requestObject('https://www.cool1024.com/devexample/china').subscribe(options => this.blockOptions = options);
    }

    doSearchUser = (userName: string) => {
        return requestObject(`https://randomuser.me/api/?seed=cool1024&results=100`)
            .pipe(map(res => res.results.map(user => ({
                value: user.cell,
                content: `<img class="rounded-circle mr-3 my-1" height="40" width="40" src="${user.picture.thumbnail}"/>${user.name.first}`,
                text: user.name.first
            })).filter(item => ~item.text.indexOf(userName))))
    }
}
