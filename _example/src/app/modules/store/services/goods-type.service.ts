/**
 * 商品类型服务
 *
 * @file   GoodsTypeService.ts
 * @author xiaojian
 * @date   2018-04-22
 */
import { Injectable } from '@angular/core';
import { RequestService } from '../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';
import { GoodsTypeItem } from './../classes/goods-type-item.class';

@Injectable()
export class GoodsTypeService {

    constructor(private request: RequestService) { }

    /**
     * 获取商品类型列表
     */
    listGoodsType(): Observable<ApiData> {
        return this.request.url('/store/goodstype/list');
    }


    /**
     * 保存商品类型
     */
    saveGoodsType(goodsTypeItem: GoodsTypeItem): Observable<ApiData> {
        return this.request.put('/store/goodstype/save', goodsTypeItem.getDataParams());
    }

    /**
     * 删除商品类型
     */
    deleteGoodsType(goodsTypeId: number): Observable<ApiData> {
        return this.request.delete('/store/goodstype/delete', { goodsTypeId });
    }

}
