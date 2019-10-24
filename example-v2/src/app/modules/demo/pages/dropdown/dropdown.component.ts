import { Component, OnInit } from '@angular/core';
import { Item, ConfirmService } from 'ng-tui';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

    dropdowns = [
        { text: 'Action', value: 1 },
        { text: 'Another action', value: 2 },
        { text: 'Something else here', value: 3 },
    ];

    stringDropdowns = ['Action', 'Another action', 'Something else here'];

    constructor(private confirm: ConfirmService) { }

    ngOnInit() {
    }

    showClickItem(item: Item) {
        this.confirm.info('点击的选项', JSON.stringify(item)).subscribe();
    }

}
