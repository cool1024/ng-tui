/**
 * 请求服务，所有的http请求和其他请求都必须使用此服务提供的方法
 * @file request.service.ts
 * @author xiaojian
 * @date 2018年06月12日
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject, interval } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { HttpConfig } from './../../configs/http.config';
import { ApiData } from './../classes/api-data.class';


@Injectable()
export class RequestService {

    private serverUlr: string;
    private appendHeaders: { [key: string]: string };
    private useHeader: boolean;

    constructor(
        private http: HttpClient,
    ) {
        this.serverUlr = HttpConfig.SERVER_URL;
        this.appendHeaders = {};
        this.useHeader = true;
    }
    /**
     * 开启一个websocket连接
     * @param host socket服务器地址ws://www.example.com|wss://
     * @param protocols 附加协议参数
     * @return Observable<string>
     */
    websocket(host: string, protocols: string | string[] = []): Observable<string> {
        let reconnent = true;
        const subject: Subject<string> = new Subject<string>();
        interval(HttpConfig.RECONNECT_TIME).subscribe(() => {
            if (reconnent) {
                this.initWebsocket(host, protocols, subject, () => reconnent = true);
            }
            reconnent = false;
        });
        return subject.asObservable();
    }

    /**
     * 初始化一个websocket连接
     * @param host 主机地址
     * @param protocols 附加参数
     * @param subject 任务调度
     * @param reconnent 重连方法
     */
    private initWebsocket(host: string, protocols: string | string[], subject: Subject<string>, reconnent: Function) {
        const ws = new WebSocket(host, protocols);
        ws.onmessage = (res: MessageEvent) => { subject.next(res.data); };
        ws.onclose = () => { reconnent(); };
    }

    text(url: string): Observable<string> {
        return this.http.request('get', this.serverUlr + url, { responseType: 'text' });
    }

    request(method: string, url: string, body: any): Observable<string> {
        return this.http.request(method, url, { responseType: 'text', body });
    }

    url(url: string, check = true): Observable<ApiData> {
        const observable = this.http.get<ApiData>(this.serverUlr + url, { headers: this.getHeaders() });
        return check ? observable.pipe(skipWhile(res => res.result === false)) : observable;
    }

    get(url: string, params: { [key: string]: any } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = params as boolean;
            params = {};
        }
        const observable = this.http.get<ApiData>(this.serverUlr + url, { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.pipe(skipWhile(res => res.result === false)) : observable;
    }
    post(url: string, params?: { [key: string]: any } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = params as boolean;
            params = {};
        }
        const observable = this.http.post<ApiData>(this.serverUlr + url, params, { headers: this.getHeaders() });
        return check ? observable.pipe(skipWhile(res => res.result === false)) : observable;
    }

    put(url: string, params?: { [key: string]: any } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = params as boolean;
            params = {};
        }
        const observable = this.http.put<ApiData>(this.serverUlr + url, params, { headers: this.getHeaders() });
        return check ? observable.pipe(skipWhile(res => res.result === false)) : observable;
    }

    delete(url: string, params?: { [key: string]: any } | boolean, check = true): Observable<ApiData> {
        if (typeof params === 'boolean') {
            check = params as boolean;
            params = {};
        }
        const observable = this.http.delete<ApiData>(this.serverUlr + url, { headers: this.getHeaders(), params: this.getParams(params) });
        return check ? observable.pipe(skipWhile(res => res.result === false)) : observable;
    }

    files(url: string, params: { [key: string]: any },
        files: Array<{ name: string, files: Array<File> }> = [],
        check = true): Observable<ApiData> {
        const observable = this.http.post<ApiData>(
            this.serverUlr + url, this.getFormdata(params, files), { headers: this.getHeaders() });
        return check ? observable.pipe(skipWhile(res => res.result === false)) : observable;
    }

    upload(url: string, files: Array<{ name: string, files: Array<File> }>,
        onprogress: (value: number) => void, final: (value: ApiData) => void) {
        const req = new HttpRequest('POST', this.serverUlr + url, this.getFormdata({}, files), {
            headers: this.getHeaders(),
            reportProgress: true,
        });
        this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                onprogress(percentDone);
            } else if (event instanceof HttpResponse) {
                final(event.body as ApiData);
            }
        });
    }

    /**
     * 单上传并附带上传进度
     * @param url 上传地址
     * @param fileItem 文件项，例如 {name:'file banner',file:imageFile}
     */
    progresser(url: string, fileItem: { name: string, file: File }): Observable<string | number> {
        const subject = new Subject<string | number>();
        this.upload(url, [{ name: fileItem.name, files: [fileItem.file] }],
            progress => {
                subject.next(progress);
            }, res => {
                subject.next(res.datas);
                subject.complete();
            });
        return subject.asObservable();
    }

    /**
     * oss文件上传，简单方法
     * @param {string} url 请求接口地址
     * @param {File} file 要上传的文件对象
     * @return {Observable<string>}
     */
    ossUpload(url: string, file: File): Observable<string> {
        return <Observable<string>>this.ossUploadRequest(url, file);
    }

    ossUploadRequest(url: string, file: File, useProgress = false): Observable<string | number> {
        const subject = new Subject<string | number>();
        this.url(`${url}?file=${file.name}`).subscribe(res => {
            const request = new XMLHttpRequest();
            const formData = this.getFormdata({
                name: file.name,
                key: `${res.datas.dir}.${this.getFileType(file.name)}`,
                policy: res.datas.policy,
                OSSAccessKeyId: res.datas.accessid,
                success_action_status: '200',
                signature: res.datas.signature,
                file,
            });

            if (useProgress) {
                request.upload.onprogress = (event: ProgressEvent) => {
                    subject.next(Math.ceil(event.loaded / event.total * 100));
                };
            }

            request.onload = (response: any) => {
                if (response.target.status === 200) {
                    subject.next(`${res.datas.host}/${formData.get('key')}`);
                } else {
                    console.error('ossUpload=>', response);
                    subject.next('upload response');
                }
                subject.complete();
            };

            request.onerror = (error: any) => {
                console.error('ossUpload=>', error);
                subject.next('upload error');
                subject.complete();
            };
            request.open('post', res.datas.host);
            request.send(formData);
        });
        return subject.asObservable();
    }

    withHeader(headers: { [key: string]: string }): RequestService {
        const request = new RequestService(this.http);
        request.serverUlr = this.serverUlr;
        request.appendHeaders = headers;
        request.useHeader = this.useHeader;
        return request;
    }

    get withoutHost(): RequestService {
        const request = new RequestService(this.http);
        request.serverUlr = '';
        request.appendHeaders = this.appendHeaders;
        request.useHeader = this.useHeader;
        return request;
    }

    get withoutHeader(): RequestService {
        const request = new RequestService(this.http);
        request.serverUlr = this.serverUlr;
        request.appendHeaders = this.appendHeaders;
        request.useHeader = false;
        return request;
    }

    private getFileType(filePath: string) {
        const startIndex = filePath.lastIndexOf('.');
        return startIndex !== -1 ? filePath.substring(startIndex + 1, filePath.length).toLowerCase() : 'unknow';
    }

    private getParams(params: { [key: string]: number | string } = {}): HttpParams {
        params = JSON.parse(JSON.stringify(params));
        let httpParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined && params[key] !== '') {
                if (typeof params[key] === 'number') {
                    params[key] = params[key].toString();
                }
                httpParams = httpParams.append(key, params[key] as string);
            }
        }
        return httpParams;
    }

    private getHeaders(): HttpHeaders {
        let header = new HttpHeaders();
        for (const key in this.appendHeaders) {
            if (this.appendHeaders.hasOwnProperty(key)) {
                header = header.append(key, this.appendHeaders[key]);
            }
        }
        // tslint:disable-next-line:no-unused-expression
        this.useHeader && HttpConfig.AUTH_HEADER_PARAMS.forEach(key => {
            const tokenValue = localStorage.getItem(key) || '';
            if (tokenValue) {
                header = header.append(key, tokenValue);
            }
        });
        return header;
    }

    private getFormdata(params: { [key: string]: number | string | File }, filesArray = new Array<{ name: string, files: Array<File> }>()) {
        const formdata = new FormData();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                if (typeof params[key] === 'number') {
                    params[key] = params[key].toString();
                }
                formdata.append(key, params[key] as string);
            }
        }
        for (const key in filesArray) {
            if (filesArray.hasOwnProperty(key)) {
                const files = filesArray[key];
                for (let i = 0; i < files.files.length; i++) {
                    formdata.append(files.name, files.files[i]);
                }
            }
        }
        return formdata;
    }
}
