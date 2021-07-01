/**
 * 统一响应拦截器
 * @author cool1024
 * @date   2018-06-21
 */
import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { DefaultHttpConfig, HttpConfig, HTTP_CONFIG, ApiData } from './request';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    private config: HttpConfig;

    constructor(@Inject(HTTP_CONFIG) httpConfig: HttpConfig) {
        this.config = { ...DefaultHttpConfig, ...httpConfig };
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const startTime = new Date().getTime();

        return next.handle(request).pipe(
            timeout(this.config.TIME_OUT),
            catchError((error) => this.errorHandle(error)),
            map((resp) => this.responseHandle(resp, request, startTime))
        );
    }

    /**
     * 错误处理方法
     * @param error 错误数据对象
     */
    private errorHandle(error: any): Observable<HttpResponse<ApiData>> {
        // if (error instanceof HttpErrorResponse) {
        // } else if (error instanceof TimeoutError) {
        // } else {
        // }
        return of<HttpResponse<ApiData>>(
            new HttpResponse<ApiData>({
                status: error.status,
                body: ApiData.error(error.status, error.message),
            })
        );
    }

    /**
     * 响应数据预处理
     * @param res 响应数据
     * @param request 请求对象
     */
    private responseHandle(resp: any, request: HttpRequest<any>, time: number): HttpResponse<ApiData> {
        if (resp instanceof HttpResponse) {
            const apiData = ApiData.create(resp.status, resp.body);
            return new HttpResponse<ApiData>({ body: ApiData.create(resp.status, resp.body) });
        }
        return resp;
    }
}
