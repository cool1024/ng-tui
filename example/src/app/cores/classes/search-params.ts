export class SearchParams {
    constructor(public params: { [key: string]: string | number | any }, private emptyNumber = 0) { }
    get values(): { [key: string]: string | number } {
        const params: { [key: string]: string | number } = {};
        for (const key in this.params) {
            if (this.params[key] === null || this.params[key] === undefined) {
                continue;
            } else if (typeof this.params[key] === 'string') {
                if (!!this.params[key]) { params[key] = this.params[key]; }
            } else if (typeof this.params[key] === 'number') {
                if (this.params[key] !== this.emptyNumber) {
                    params[key] = this.params[key];
                }
            } else if (typeof this.params[key] === 'object') {
                // 其他数据对象解析....
                this.params[key] = '无法解析的数据格式';
            }
        }
        return params;
    }
    clean() {
        for (const key in this.params) {
            if (typeof this.params[key] === 'string') {
                this.params[key] = '';
            } else if (typeof this.params[key] === 'number') {
                this.params[key] = this.emptyNumber;
            } else if (typeof this.params[key] === 'object') {
                this.params[key] = null;
            }
        }
    }
}
