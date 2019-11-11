import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

    theads: Array<any> = [
        '#',
        { title: 'Name'  },
        { title: 'Opt' },
    ];

    constructor() { }

    ngOnInit() {

    }

}
