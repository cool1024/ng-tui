import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';
import { PermissionManagerComponent } from './pages/permission-manager/permission-manager.component';
import { PermissionModalComponent } from './pages/permission-manager/permission-modal.component';
import { PermissionGroupModalComponent } from './pages/permission-manager/permission-group-modal.component';
import { MenuGroupModalComponent } from './pages/menu-manager/menu-group-modal.component';
import { MenuModalComponent } from './pages/menu-manager/menu-modal.component';
import { RoleManagerComponent } from './pages/role-manager/role-manager.component';
import { RoleUlComponent } from './pages/role-manager/role-ul.component';
import { RoleModalComponent } from './pages/role-manager/role-modal.component';
import { ManagerDetailComponent } from './pages/manager-detail/manager-detail.component';

const routes: Routes = [
    { path: 'menu', component: MenuManagerComponent },
    { path: 'permission', component: PermissionManagerComponent },
    { path: 'role', component: RoleManagerComponent },
    { path: 'detail', component: ManagerDetailComponent },
];

export const declarationComponents = [
    MenuManagerComponent,
    PermissionManagerComponent,
    PermissionGroupModalComponent,
    PermissionModalComponent,
    MenuGroupModalComponent,
    MenuModalComponent,
    RoleManagerComponent,
    RoleUlComponent,
    RoleModalComponent,
    ManagerDetailComponent,
];

export const entryComponents = [
    PermissionModalComponent,
    PermissionGroupModalComponent,
    MenuGroupModalComponent,
    MenuModalComponent,
    RoleModalComponent,
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SystemRoutingModule { }
