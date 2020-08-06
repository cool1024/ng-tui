import { Injectable } from '@angular/core';
import { HttpConfig } from '../../configs/http.config';
declare const window: any;

@Injectable()
export class CryptService {

    private crypt: any;

    constructor() {
        if (window.JSEncrypt !== undefined && window.JSEncrypt !== null) {
            this.crypt = new window.JSEncrypt();
            this.crypt.setKey(HttpConfig.RSA_PUBLIC_KEY);
        }
    }

    encryptParams(params: { [key: string]: number | string }): { [key: string]: string } {
        const secretParams = <{ [key: string]: string }>{};
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                secretParams[key] = this.crypt.encrypt(params[key].toString());
            }
        }
        return secretParams;
    }

    encryptParam(param: string | number): string {
        return this.crypt.encrypt(param.toString());
    }
}
