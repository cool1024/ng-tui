import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StoreRoutingModule, declarationComponents, entryComponents } from './store.routing';
import { SortablejsModule } from 'angular-sortablejs';
import { ShareModule } from '../../cores/share.module';
import { UserService } from './services/user.service';
import { GoodsTypeService } from './services/goods-type.service';
import { GoodsService } from './services/goods.service';
import { OrderService } from './services/order.service';
import { BannerService } from './services/banner.service';

@NgModule({
    imports: [
        FormsModule,
        ShareModule,
        StoreRoutingModule,
        SortablejsModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents],
    providers: [
        UserService,
        GoodsTypeService,
        GoodsService,
        OrderService,
        BannerService,
    ]
})
export class StoreModule { }
