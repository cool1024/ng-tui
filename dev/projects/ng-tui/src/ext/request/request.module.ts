import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpConfig, HTTP_CONFIG } from './request';
import { RequestInterceptor } from './request.interceptor';

@NgModule({
    imports: [],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
})
export class RequestModule {
    public static forRoot(config: HttpConfig): ModuleWithProviders<RequestModule> {
        return {
            ngModule: RequestModule,
            providers: [{ provide: HTTP_CONFIG, useValue: config }],
        };
    }
}
