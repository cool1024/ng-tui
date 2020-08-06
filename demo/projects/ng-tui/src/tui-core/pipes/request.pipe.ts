import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { requestString } from './request';

@Pipe({ name: 'request' })
export class RequestPipe implements PipeTransform {
    transform(value: string): Observable<string> {
        return requestString(value);
    }
}