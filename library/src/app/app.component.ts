import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    uploader = (file: File): Observable<number | string> => {
        return interval(100).pipe(take(101), map(progress => progress >= 100 ? 'success' : progress));
    }

    constructor() { }
}
