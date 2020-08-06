import { Item } from './interfaces/item.interface';

export class Util {

    static formateOptions(options: Array<string | Item>): Array<Item> {
        return options.map(option => typeof option === 'string' ? { value: option, text: option } : option);
    }

    static getStringArray(param: string | string[]): string[] {
        return typeof param === 'string' ? [param] : param;
    }

    static notEmpty(value: string | number | any[]): boolean {
        return value !== '' && value !== 0 && (Array.isArray(value) && value.length !== 0);
    }
}