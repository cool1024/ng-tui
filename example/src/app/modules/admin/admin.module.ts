import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../cores/share.module';

/*路由模块*/
import { AdminRoutingModule, declarationComponents, entryComponents } from './admin.routing';

/*服务列表*/
import { CompanyService } from './services/company.service';
import { PlatformService } from './services/platform.service';

@NgModule({
    imports: [
        FormsModule,
        ShareModule,
        AdminRoutingModule,
    ],
    declarations: [
        declarationComponents,
    ],
    entryComponents: [
        entryComponents
    ],
    providers: [
        CompanyService,
        PlatformService,
    ]

})
export class AdminModule { }
