/**
 * 统一请求拦截器
 * @author cool1024
 * @date   2018-06-21
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../configs/http.config';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // 获取请求参数
        let requestBody = request.body;

        // 如果开启了请求参数打包，那么处理POST/PUT请求的参数(base64处理)
        if (HttpConfig.OPEN_PARAM_PACKAGE
            && requestBody
            && (!(requestBody instanceof FormData))
            && (request.method === 'POST' || request.method === 'PUT')) {
            requestBody = { PACKAGE_PARAMAS: btoa(JSON.stringify(requestBody)) };
            request = request.clone({ body: requestBody });
            console.log(requestBody, (requestBody instanceof FormData));

        }

        return next.handle(request);
    }
}
