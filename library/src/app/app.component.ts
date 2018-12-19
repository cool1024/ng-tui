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

    selectOptions = ['AAAAAAA', 'BBBBBBBB', 'CCCCCC'];

    value = 'AAAAAAA';
}
