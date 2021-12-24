import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const HTTP_CONFIG = 'HTTP_CONFIG';
export interface HttpConfig {
    SERVER_URL: string;
    TIME_OUT: number;
    WEBSOCKET_URL: string;
    RECONNECT_TIME: number;
}
export const DefaultHttpConfig = {
    SERVER_URL: 'http://localhost',
    TIME_OUT: 10000,
    WEBSOCKET_URL: 'ws://localhost',
    RECONNECT_TIME: 1000,
};

export class ApiData {
    get message(): string {
        return this.origin.message || '';
    }

    get code(): number {
        return this.origin.code;
    }

    get data(): any | any[] {
        return this.origin.data;
    }
    private origin: { [key: string]: number | string | any[] | any } = {};
    private startTime = 0;
    private endTime = 0;

    static error(status: number, errMsg: string): ApiData {
        const instance = new ApiData();
        instance.origin = {
            status,
            message: errMsg,
        };
        return instance;
    }

    static create(status: number, origin: any): ApiData {
        const instance = new ApiData();
        instance.origin = {
            status,
            ...origin,
        };
        return instance;
    }

    getNumber(key: string): number {
        return this.origin[key];
    }

    getArray(key: string): any[] {
        return this.origin[key];
    }

    saveTime(time: number): void {
        if (this.startTime <= 0) {
            this.startTime = time;
        } else {
            this.endTime = time;
        }
    }
}

@Injectable()
export class RequestService {
    private config: HttpConfig;
    private appendHeaders: { [key: string]: string };
    private useHeader: boolean;

    constructor(private http: HttpClient, @Inject(HTTP_CONFIG) httpConfig: HttpConfig) {
        this.config = { ...DefaultHttpConfig, ...httpConfig };
        this.appendHeaders = {};
        this.useHeader = true;
    }
}
