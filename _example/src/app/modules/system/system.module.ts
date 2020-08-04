import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * 路由模块
 */
import { SystemRoutingModule, declarationComponents, entryComponents } from './system.routing';

/**
 * 服务列表
 */
import { PermissionService } from './services/permission.service';
import { MenuService } from './services/menu.service';
import { RoleService } from './services/role.service';
import { ManagerService } from './services/manager.service';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { ShareModule } from '../../cores/share.module';

@NgModule({
    imports: [
        FormsModule,
        ShareModule,
        SystemRoutingModule,
        SortablejsModule,
    ],
    declarations: [
        declarationComponents,
    ],
    entryComponents: [
        entryComponents,
    ],
    providers: [
        PermissionService,
        MenuService,
        RoleService,
        ManagerService,
    ]

})
export class SystemModule { }
