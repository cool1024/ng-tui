import { Injectable } from "@angular/core";

const TUI_STORAGE_KEY = 'TUI_STORAGE_KEY';

@Injectable()
export class ValueService {

    private param: { [key: string]: any } = {};

    get value(): { [key: string]: any } {
        return { ...this.loadFromStorage(), ...this.param };
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
    }

    getValue(key: string, defaultValue: any): any {
        return this.value[key] || defaultValue;
    }
}