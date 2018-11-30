import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Item } from '../../projects/ng-tui/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    selectedValue = 0;

    doSearch = (key: string) => {
        return of(['A', 'AA', 'B', 'BB', 'ABC']).pipe(
            // delay(2000),
            map<string[], Item[]>(res => {
                return res.map((item, index) => ({ value: index, text: item }));
            })
        );
    }
}
