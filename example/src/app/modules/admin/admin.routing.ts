import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTableComponent } from './pages/company-table/company-table.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { PlatformTableComponent } from './pages/platform-table/platform-table.component';
import { PlatformDetailComponent } from './pages/platform-detail/platform-detail.component';

const routes: Routes = [
    {
        path: 'company',
        component: CompanyTableComponent,
        children: [
            {
                path: 'detail', component: CompanyDetailComponent, data: {
                    breadcrumbs: [{ title: '公司列表', path: '/admin/company' }, { title: '添加公司' }]
                }
            },
            {
                path: 'detail/:id', component: CompanyDetailComponent, data: {
                    breadcrumbs: [{ title: '公司列表', path: '/admin/company' }, { title: '公司详情' }]
                }
            },
        ],
        data: {
            breadcrumbs: [{ title: '公司列表' }]
        }
    },
    {
        path: 'platform',
        component: PlatformTableComponent,
        children: [
            {
                path: 'detail', component: PlatformDetailComponent, data: {
                    breadcrumbs: [{ title: '管理员列表', path: '/admin/platform' }, { title: '添加管理员' }]
                }
            },
            {
                path: 'detail/:id', component: PlatformDetailComponent, data: {
                    breadcrumbs: [{ title: '管理员列表', path: '/admin/platform' }, { title: '管理员详情' }]
                }
            },
        ],
        data: {
            breadcrumbs: [{ title: '管理员列表' }]
        }
    },
];

export const declarationComponents = [
    CompanyTableComponent,
    CompanyDetailComponent,
    PlatformTableComponent,
    PlatformDetailComponent,
];

export const entryComponents = [
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
