import { Component, ViewChildren, QueryList } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Item } from '../../projects/ng-tui/src/public_api';
import { SideMenuGroupDirective } from 'projects/ng-tui/src/modules/dropdown/side-menu.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    selectedValue = 0;

    @ViewChildren(SideMenuGroupDirective) menuGroups: QueryList<SideMenuGroupDirective>;

    doSearch = (key: string) => {
        return of(['A', 'AA', 'B', 'BB', 'ABC']).pipe(
            // delay(2000),
            map<string[], Item[]>(res => {
                return res.map((item, index) => ({ value: index, text: item }));
            })
        );
    }

    closeOtherMenu(index: number) {
        const menuGroups = this.menuGroups.toArray();
        menuGroups.splice(index, 1);
        menuGroups.forEach(item => item.dismiss());
    }
}
