import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../tui-core/interfaces/item.interface';


@Injectable()
export class SelectService {


    showSelects(targetDom: HTMLElement): Observable<SelectsEvent> {
        return null;

    }
}

export enum SelectType {
    SELECT, CANCEL
}

export interface SelectsEvent {
    selected: Item[],
    eventItem: Item,
    type: SelectType
}