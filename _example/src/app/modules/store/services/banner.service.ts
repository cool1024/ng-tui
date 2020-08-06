/**
 * 用户服务
 *
 * @file   BannerService.ts
 * @author xiaojian
 * @date   2018-04-22
 */
import { Injectable } from '@angular/core';
import { RequestService } from '../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';
import { Banner } from '../interfaces/banner.interface';

@Injectable()
export class BannerService {

    constructor(private request: RequestService) { }

    /**
     * 获取幻灯片列表
     */
    getBanners(): Observable<ApiData> {
        return this.request.url('/store/banner/all');
    }

    /**
     * 添加幻灯片
     * @param {Banner} banner 幻灯片数据
     */
    insertBanner(banner: Banner): Observable<ApiData> {
        return this.request.post('/store/banner/insert', banner);
    }

    /**
     * 更新幻灯片
     * @param {Banner} banner 幻灯片数据
     */
    updateBanner(banner: Banner): Observable<ApiData> {
        return this.request.put('/store/banner/update', banner);
    }

    /**
     * 删除幻灯片
     * @param {number} bannerId 幻灯片编号
     */
    deleteBanner(bannerId: number): Observable<ApiData> {
        return this.request.delete('/store/banner/delete', { bannerId });
    }

    /**
     * 排序幻灯片
     * @param ids 幻灯片序号列表
     */
    sortBanner(ids: number[]): Observable<ApiData> {
        return this.request.put('/store/banner/sort', { ids });
    }

    /**
     * 上传幻灯片图片
     * @param {File} 文件对象
     */
    uploadBanner(file: File): Observable<string> {
        return this.request.ossUpload('/store/banner/access', file);
    }
}
