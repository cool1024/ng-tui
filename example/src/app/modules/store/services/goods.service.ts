/**
 * 用户服务
 *
 * @file   UserService.ts
 * @author xiaojian
 * @date   2018-04-22
 */
import { Injectable } from '@angular/core';
import { RequestService } from '../../../cores/services/request.service';
import { ApiData } from '../../../cores/classes/api-data.class';
import { SearchParams } from '../../../cores/classes/search-params';
import { Goods, GoodsSpecification, GoodsSpecificationDetail } from '../interfaces/goods.interface';
import { Observable } from 'rxjs';
import { Pagination } from 'ng-tui';

@Injectable()
export class GoodsService {

    constructor(private request: RequestService) { }

    /**
     * 查询商品，分页
     */
    searchGoods(pagination: Pagination, search: SearchParams): Observable<ApiData> {
        return this.request.get('/store/goods/search', pagination.getpageDataWith(search.values));
    }

    /**
     * 删除商品
     */
    deleteGoods(goodsId: number): Observable<ApiData> {
        return this.request.delete('/store/goods/delete', { goodsId });
    }

    /**
     * 获取指定商品
     */
    getGoods(goodsId: number): Observable<ApiData> {
        return this.request.get('/store/goods/get', { goodsId });
    }

    /**
     * 添加商品
     */
    insertGoods(goods: Goods): Observable<ApiData> {
        return this.request.post('/store/goods/insert', goods);
    }

    /**
     * 更新商品
     */
    updateGoods(goods: Goods) {
        return this.request.put('/store/goods/update', goods);
    }

    /**
     * 更新商品规格
     */
    updateGoodsSpecification(
        goodsId: number,
        goodsSpecifications: GoodsSpecification[],
        goodsSpecificationDetails: GoodsSpecificationDetail[]
    ): Observable<ApiData> {
        return this.request.put('/store/goods/specification/update', { goodsId, goodsSpecifications, goodsSpecificationDetails });
    }

    /**
     * 获取商品下拉选项
     */
    getGoodsTypeOptions(): Observable<ApiData> {
        return this.request.url('/store/goods/type/options');
    }

    /**
     * 上传商品图片
     */
    uploadGoodsImage(file: File): Observable<string> {
        return this.request.ossUpload('/store/goods/image/access', file);
    }
}
