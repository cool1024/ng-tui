import { Item } from './interface/item.interface';
import { Time } from './interface/time.interface';

export class Util {
  static isString(value: any): boolean {
    return typeof value === 'string';
  }

  static formateItems(options: Array<Item | string | number>): Array<Item> {
    const result = options.map((item) => {
      const tmpItem: Item = { value: null, text: '' };
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
    return result;
  }

  static formateOptions(options: Array<string | Item>): Array<Item> {
    const result = options.map((option) =>
      typeof option === 'string' ? { value: option, text: option } : option
    );
    return result;
  }

  static getStringArray(param: string | string[]): string[] {
    return typeof param === 'string' ? [param] : param;
  }

  private static notEmpty(value: string | number | any | any[]): boolean {
    if (Array.isArray(value)) {
      return value.length > 0;
    } else {
      return value !== '' && value !== 0;
    }
  }

  static attrNotNullAndEmpty(object: any, attrName: string): boolean {
    return (
      object.hasOwnProperty(attrName) && Util.notNullAndEmpty(object[attrName])
    );
  }

  static notNull(value: string | number | any | any[]): boolean {
    return value !== null && value !== undefined;
  }

  static allNotNull(...item: any[]): boolean {
    // tslint:disable-next-line: no-bitwise
    const result = !~item.findIndex((e) => !Util.notNull(e));
    return result;
  }

  static notNullAndEmpty(value?: string | number | any[]): boolean {
    return Util.notNull(value) && Util.notEmpty(value);
  }

  static isNullOrEmpty(value?: string | number | any[]): boolean {
    return !Util.notNullAndEmpty(value);
  }

  static getTwoNumStr(num: number): string {
    return num > 9 ? num.toString() : `0${num}`;
  }

  static getTimeStr(time: Time): string {
    return `${Util.getTwoNumStr(time.hour)}:${Util.getTwoNumStr(
      time.minute
    )}:${Util.getTwoNumStr(time.second)}`;
  }

  static getStylePx(px: number): string {
    return `${px}px`;
  }
}
