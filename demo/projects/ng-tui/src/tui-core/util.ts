import { Item } from './interfaces/item.interface';
import { Time } from './interfaces/time.interface';

export class Util {

    static isString(value: any) {
        return typeof value === 'string';
    }

    static formateItems(options: Array<string | Item | number>): Array<Item> {
        return options.map(item => {
            let tmpItem = { value: null, text: '' };
            if (typeof item === 'string') {
                tmpItem.value = item;
                tmpItem.text = item;
            }
            if (Number.isInteger(item)) {
                tmpItem.value = item;
                tmpItem.text = item.toString();
            }
            if (typeof item === 'object') {
                Object.assign(tmpItem, item);
            }
            return tmpItem;
        });
    }

    static formateOptions(options: Array<string | Item>): Array<Item> {
        return options.map(option => typeof option === 'string' ? { value: option, text: option } : option);
    }

    static getStringArray(param: string | string[]): string[] {
        return typeof param === 'string' ? [param] : param;
    }

    private static notEmpty(value: string | number | any | any[]): boolean {
        if (Array.isArray(value)) {
            return value.length > 0
        } else {
            return value !== '' && value !== 0;
        }
    }

    static notNull(value: string | number | any | any[]): boolean {
        return value !== null && value !== undefined;
    }

    static notNullAndEmpty(value: string | number | any[]): boolean {
        return Util.notNull(value) && Util.notEmpty(value);
    }

    static isNullOrEmpty(value: string | number | any[]): boolean {
        return !Util.notNullAndEmpty(value);
    }

    static getTwoNumStr(num: number): string {
        return num > 9 ? num.toString() : `0${num}`;
    }

    static getTimeStr(time: Time) {
        return `${Util.getTwoNumStr(time.hour)}:${Util.getTwoNumStr(time.minute)}:${Util.getTwoNumStr(time.second)}`;
    }
}