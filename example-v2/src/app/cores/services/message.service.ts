import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { Message } from '../classes';

@Injectable()
export class MessageService {

    msgApiUrl: string;

    msgToken = {};

    messages = new Array<Message>();

    obs: Observable<string>;

    constructor(private request: RequestService) { }

    public get msgCount() {
        return this.messages ? this.messages.length : 0;
    }

    public get msgNewCount() {
        return this.messages ? this.messages.filter(msg => msg.isNew()).length : 0;
    }

    public initWs(wsHost: string, protocols: string | string[]) {
        this.obs = this.request.websocket(wsHost, protocols);
        this.obs.subscribe(msg => this.messages.push(new Message(msg)));
    }

    public initMs(msgHost: string, tokenParams: any) {
        this.msgApiUrl = msgHost;
        this.msgToken = Object.assign(this.msgToken, tokenParams);
    }

    public cleanMsg() {
        this.messages.splice(0, this.messages.length);
    }

    public sendMessage(params: any) {
        return this.request.request('post', this.msgApiUrl, Object.assign(params, this.msgToken));
    }
}
