import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map, skipWhile } from "rxjs/operators";

const TUI_STORAGE_KEY = 'TUI_STORAGE_KEY';

@Injectable()
export class ValueService {

    private param: { [key: string]: any } = {};

    get value(): { [key: string]: any } {
        return { ...this.loadFromStorage(), ...this.param };
    }

    private subject!: Subject<[string, any]>;

    constructor() {
        this.subject = new Subject<[string, any]>();
    }

    private loadFromStorage(): { [key: string]: any } {
        const storageContent = localStorage.getItem(TUI_STORAGE_KEY) || '{}';
        try {
            return JSON.parse(storageContent);
        } catch (e) {
            console.error(e);
        }
    }

    setValue(key: string, value: any, keep = false): void {
        this.param[key] = value;
        if (keep) {
            const storageObj = this.loadFromStorage();
            storageObj[key] = value;
            localStorage.setItem(TUI_STORAGE_KEY, JSON.stringify(storageObj));
        }
        this.subject.next([key, value]);
    }

    getValue(key: string, defaultValue: any): any {
        if (this.value[key] !== false) {
            return this.value[key] || defaultValue;
        } else {
            return false;
        }
    }

    valueChange(key: string): Observable<any> {
        return this.subject.asObservable().pipe(
            skipWhile(item => item[0] !== key),
            map<[string, any], any>(item => item[1])
        );
    }
}