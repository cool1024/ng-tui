import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

    private envValues: any = {};

    env(): { [key: string]: string | number | boolean } {
        return this.envValues;
    }

    setValue(key: string, value: string | number | boolean, storage = false): void {

    }
}