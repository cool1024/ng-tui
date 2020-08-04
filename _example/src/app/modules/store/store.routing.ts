import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsTypesComponent } from './pages/goods-types/goods-types.component';
import { GoodsTableComponent } from './pages/goods-table/goods-table.component';
import { OrderTableComponent } from './pages/order-table/order-table.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { UserTableComponent } from './pages/user-table/user-table.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { BannerManagerComponent } from './pages/banner-manager/banner-manager.component';
import { BannerDetailComponent } from './pages/banner-manager/banner-detail.component';
import { GoodsDetailComponent } from './pages/goods-detail/goods-detail.component';

const routes: Routes = [
    {
        path: 'goods',
        component: GoodsTableComponent,
        data: { breadcrumbs: [{ title: '商品列表' }] },
        children: [
            {
                path: 'detail/:id',
                component: GoodsDetailComponent,
                data: { breadcrumbs: [{ title: '商品列表', path: '/store/goods' }, { title: '商品详情' }] }
            },
            {
                path: 'detail',
                component: GoodsDetailComponent,
                data: { breadcrumbs: [{ title: '商品列表', path: '/store/goods' }, { title: '添加商品' }] }
            }
        ]
    },
    {
        path: 'types',
        component: GoodsTypesComponent,
        data: { breadcrumbs: [{ title: '商品分类' }] }
    },
    {
        path: 'order',
        component: OrderTableComponent,
        data: { breadcrumbs: [{ title: '订单列表' }] },
        children: [
            {
                path: 'detail/:id', component: OrderDetailComponent,
                data: { breadcrumbs: [{ title: '订单列表', path: '../' }, { title: '订单详情' }] },
            },
        ]
    },
    {
        path: 'user',
        component: UserTableComponent,
        data: { breadcrumbs: [{ title: '会员列表' }] },
        children: [
            {
                path: 'detail/:id', component: UserDetailComponent,
                data: { breadcrumbs: [{ title: '会员列表', path: '/store/user' }, { title: '会员详情' }] },
            }
        ]
    },
    {
        path: 'banner',
        component: BannerManagerComponent,
        data: { breadcrumbs: [{ title: '幻灯片' }] }
    }
];

export const declarationComponents = [
    GoodsTypesComponent,
    GoodsTableComponent,
    GoodsDetailComponent,
    OrderTableComponent,
    OrderDetailComponent,
    UserTableComponent,
    UserDetailComponent,
    BannerManagerComponent,
    BannerDetailComponent,
];

export const entryComponents = [
    BannerDetailComponent,
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class StoreRoutingModule { }
