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
            { path: 'detail', component: CompanyDetailComponent },
            { path: 'detail/:id', component: CompanyDetailComponent },
        ]
    },
    {
        path: 'platform',
        component: PlatformTableComponent,
        children: [
            { path: 'detail', component: PlatformDetailComponent },
            { path: 'detail/:id', component: PlatformDetailComponent },
        ]
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
