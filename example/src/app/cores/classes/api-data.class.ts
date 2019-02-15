export class ApiData {

    startTime: number;
    endTime: number;

    constructor(
        public result: boolean,
        public message: string | { [key: string]: string[] },
        public datas: any | { rows: any[], total: number } = {},
        public id: number = 0
    ) {
        this.endTime = new Date().getTime();
    }

    static getApiDataFromJson(obj: any): ApiData {
        return new ApiData(obj.result ? true : false, obj.message || '', obj.datas || obj.data);
    }

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

    get requestTime(): number {
        return this.endTime - this.startTime;
    }

    get data(): any {
        return this.datas;
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
