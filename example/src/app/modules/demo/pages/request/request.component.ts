/**
 * request example page
 *
 * @author xiaojian
 * @file   request.component.ts
 * @date   2018-8-22 13:35:58
 */
import { Component } from '@angular/core';
import { RequestService, CryptService } from '../../../../cores/services';

@Component({
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss']
})
export class RequestComponent {

    constructor(private request: RequestService, private crypt: CryptService) { }

    sendPackParams() {
        const requestParams = {
            account: 'admin',
            password: 12345679,
            platform: 'app'
        };
        this.request.post('/goods', requestParams).subscribe();
    }

    sendSecretParams() {
        let requestParams: any = {
            account: 'admin',
            password: 12345679,
            platform: 'app'
        };

        requestParams = this.crypt.encryptParams(requestParams);

        this.request.post('/goods', requestParams).subscribe();
    }
}
