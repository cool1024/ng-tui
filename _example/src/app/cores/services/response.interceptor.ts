/**
 * 统一响应拦截器
 * @author cool1024
 * @date   2018-06-21
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, TimeoutError } from 'rxjs';
import { HttpConfig, INTERCEPTOR_MESSAGES, IGNORE_MESSAGES } from '../../configs/http.config';
import { catchError, map, timeout } from 'rxjs/operators';
import { ApiData } from '../classes';
import { ToastService } from 'ng-tui';
import { Router } from '@angular/router';
import { ApiResponse } from '../classes/api-data.class';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor(private toast: ToastService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const startTime = new Date().getTime();

        return next.handle(request).pipe(
            timeout(HttpConfig.TIME_OUT),
            catchError(error => this.errorHandle(error)),
            map(res => this.responseHandle(res, request, startTime)),
        );
    }

    /**
     * 错误处理方法
     * @param error 错误数据对象
     */
    errorHandle(error: any): Observable<HttpResponse<string>> {

        let errorMessage = '';
        let errorTitle = '';

        if (error instanceof HttpErrorResponse) {

            const code = error.status;
            errorTitle = `${code} : ${error.statusText}`;
            // 需要跳转的状态码
            if (code === 401) {
                this.router.navigateByUrl(HttpConfig.TOKEN_ERROR_URL);
            } else if (code === 403) {
                this.router.navigateByUrl(HttpConfig.AUTH_ERROR_URL);
            }
            // 获取状态码对应提示消息
            if (code === 422) {
                errorMessage = new ApiData(false, error.error.message, error.error.datas || {}).messageStr;
            } else {
                if (!~IGNORE_MESSAGES.indexOf(error.error.message)) {
                    errorMessage = INTERCEPTOR_MESSAGES[code] || HttpConfig.HTTP_ERRORS.RESPONSE_CONTENT_ERROR;
                }
            }

            // 显示提示消息
            if (~HttpConfig.INFO_CODES.indexOf(code)) {
                // tslint:disable-next-line:no-unused-expression
                errorMessage && this.toast.info(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
            } else if (~HttpConfig.WARNING_CODES.indexOf(code)) {
                // tslint:disable-next-line:no-unused-expression
                errorMessage && this.toast.warning(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
            } else {
                // tslint:disable-next-line:no-unused-expression
                errorMessage && this.toast.danger(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
            }

        } else if (error instanceof TimeoutError) {
            [errorMessage, errorTitle] = HttpConfig.HTTP_ERRORS.TIMEOUT_ERROR;
            // tslint:disable-next-line:no-unused-expression
            errorMessage && this.toast.danger(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
        } else {
            [errorMessage, errorTitle] = HttpConfig.HTTP_ERRORS.OTHER_ERROR;
            // tslint:disable-next-line:no-unused-expression
            errorMessage && this.toast.danger(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
        }

        return of<HttpResponse<string>>(new HttpResponse<string>({
            status: 200,
            body: (new ApiData(false, errorMessage).toJsonString())
        }));
    }

    /**
     * 响应数据预处理
     * @param res 响应数据
     * @param request 请求对象
     */
    responseHandle(res: any, request: HttpRequest<any>, time: number) {
        if (res instanceof HttpResponse) {
            if (res.body !== null && ApiResponse.isApiResponse(res.body)) {
                // const apiData = new ApiData(res.body.result, res.body.message, res.body.datas);
                const apiData = ApiData.getApiDataFromJson(res.body);
                apiData.startTime = time;
                if (apiData.result === false) {
                    this.toast.warning('操作失败', apiData.messageStr, HttpConfig.TOAST_ERROR_TIME);
                }
                res = res.clone<ApiData>({ body: apiData });

            } else if (request.responseType !== 'text') {
                const apiData = new ApiData(false, HttpConfig.HTTP_ERRORS.API_DATA_ERROR);
                apiData.startTime = time;
                res = res.clone<ApiData>({ body: apiData });
            }
        }
        return res;
    }
}
