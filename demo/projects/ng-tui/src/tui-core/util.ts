export class Util {
    static getStringArray(param: string | string[]): string[] {
        return typeof param === 'string' ? [param] : param;
    }

    static notEmpty(value: string | number | any[]): boolean {
        return value !== '' && value !== 0 && (Array.isArray(value) && value.length !== 0);
    }
}