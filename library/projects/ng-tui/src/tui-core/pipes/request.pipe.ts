import { Pipe, PipeTransform } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({ name: 'request' })
export class RequestPipe implements PipeTransform {
    transform(value: string): Observable<string> {
        const obj = new XMLHttpRequest();
        const obs = fromEvent(obj, 'load');
        obj.open('GET', value, true);
        obj.send();
        return obs.pipe(map<any, string>(event => event.data));
    }
}