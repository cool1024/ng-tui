import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { NodeItem, requestObject, MenuItem } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    uploader = (file: File): Observable<number | string> => {
        return interval(100).pipe(take(101), map(progress => progress >= 100 ? 'success' : progress));
    }

    menu: MenuItem = {
        title: '',
        children: []
    };

    constructor() {
        requestObject('/assets/menu.json').subscribe(obj => {
            this.menu.children = obj;
            console.log(this.menu);
        });
    }

    navHandler(item: MenuItem) {
    }
}
