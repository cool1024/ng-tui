export class ApiData {
    constructor(
        public result: boolean,
        public message: string | { [key: string]: string[] },
        public datas: any | { rows: any[], total: number } = {},
        public id: number = 0) { }
    toJsonString(): string {
        const json = {
            result: this.result || false,
            message: this.message || '',
            datas: this.datas || {},
            id: this.id || '',
        };
        return JSON.stringify(json);
    }
    get messageStr(): string {
        let message = '';
        if (typeof this.message !== 'string' && typeof this.message !== 'number') {
            for (const key in this.message) {
                if (this.message.hasOwnProperty(key)) {
                    message = this.message[key][0] || 'message error';
                    break;
                }
            }
        } else {
            message = this.message.toString();
        }
        return message;
    }
}
export class ApiResponse {

    static isApiResponse(resBody: any): boolean {
        return typeof resBody === 'object'
            && resBody.hasOwnProperty('result')
            && resBody.hasOwnProperty('message')
            && typeof resBody.result === 'boolean';
    }
}
