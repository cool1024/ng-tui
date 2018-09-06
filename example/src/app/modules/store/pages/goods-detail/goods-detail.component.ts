import { Component, OnInit } from '@angular/core';
import { ToastService, UploadConfig, Item, ConfirmService } from 'ng-tui';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GlobalService } from '../../../../cores/services';
import { GoodsSpecification, Goods } from '../../interfaces/goods.interface';
import { ApiData } from '../../../../cores/classes';
import { skipWhile, switchMap } from 'rxjs/operators';
import { GoodsService } from '../../services/goods.service';

@Component({
    selector: 'app-goods-detail',
    templateUrl: './goods-detail.component.html',
    styles: [
        `textarea{min-height:5rem;}`
    ]
})
export class GoodsDetailComponent implements OnInit {

    defaultTh = ['单价', '库存', '是否使用'];

    parentTypes = new Array<Item>();

    childTypes = new Array<any>();

    goods: Goods = { id: 0, isActive: 1, goodsName: '' };

    goodsSpecifications = new Array<GoodsSpecification>();

    goodsSpecificationDetails = new Array<any>();

    options: UploadConfig;

    get getChildTypes(): Item[] {
        return this.childTypes.filter(type => type.parentId === this.goods.goodsParentType);
    }

    constructor(
        private router: Router,
        public global: GlobalService,
        private active: ActivatedRoute,
        private toast: ToastService,
        private goodsService: GoodsService,
        private confirm: ConfirmService,
    ) {
        this.options = {
            queryString: '?x-oss-process=image/resize,h_130,w_130',
            uploader: (file: File) => this.goodsService.uploadGoodsImage(file)
        };
        this.active.paramMap.
            pipe(skipWhile(params => !params.has('id')), switchMap<ParamMap, ApiData>(params => {
                this.goods.id = parseInt(params.get('id'), 10);
                return this.goodsService.getGoods(this.goods.id);
            }))
            .subscribe(res => {
                this.goods = res.datas.goods;
                this.goodsSpecifications = res.datas.goodsSpecifications;
                this.goodsSpecificationDetails = res.datas.goodsSpecificationDetails;
            });
    }

    ngOnInit() {
        this.goodsService.getGoodsTypeOptions().subscribe(res => {
            this.parentTypes = res.datas.parentTypes;
            this.childTypes = res.datas.childTypes;
        });
        // this.goodsSpecifications.push(
        //     { specificationTitle: '商品颜色', specificationNames: ['红色', '黑色'] },
        //     { specificationTitle: '内存', specificationNames: ['3+32GB', '4+64GB', '8+123GB'] },
        //     { specificationTitle: '套餐', specificationNames: ['官方标配', '带耳机', '豪华礼包'] },
        // );
        // this.resetSpecificationDetail();
    }


    addSpecification() {
        this.goodsSpecifications.push({
            specificationTitle: '新分类',
            specificationNames: ['规格一', '规格二']
        });
        this.resetSpecificationDetail();
    }

    removeSpecification(index: number) {
        this.goodsSpecifications.splice(index, 1);
        this.resetSpecificationDetail();
    }

    addSpecificationChild(goodsSpecification: GoodsSpecification) {
        goodsSpecification.specificationNames.push('新增规格');
        this.resetSpecificationDetail();
    }

    removeSpecificationChild(goodsSpecification: GoodsSpecification, index: number) {
        goodsSpecification.specificationNames.splice(index, 1);
        this.resetSpecificationDetail();
    }

    /**
     * 确认添加
     */
    confirmInsert(btn: any) {
        this.goodsService.insertGoods(this.goods).subscribe({
            next: res => {
                this.toast.success('添加成功', `成功添加商品${this.goods.goodsName}`);
                this.goods.id = res.datas.id;
            },
            complete: () => {
                btn.dismiss();
            }
        });
    }

    confirmUpdate(btn: any) {
        this.goodsService.updateGoods(this.goods).subscribe({
            next: res => {
                this.toast.success('修改成功', `成功修改商品${this.goods.goodsName}的信息`);
            },
            complete: () => {
                btn.dismiss();
            }
        });
    }

    confirmSave(btn: any) {
        if (this.goods.id <= 0) {
            this.confirm.info('无法保存', '您还没有确认添加商品，不能保存商品的规格');
            btn.dismiss();
            return;
        }
        const specificationDetails = this.goodsSpecificationDetails.map(detail => {
            detail.specificationTitles = detail.specificationTitleIndexs.map((j, i) => this.goodsSpecifications[i].specificationNames[j]);
            return detail;
        });
        this.goodsService.updateGoodsSpecification(this.goods.id, this.goodsSpecifications, specificationDetails)
            .subscribe({
                next: res => {
                    this.toast.success('保存成功', `成功保存商品的规格`);
                },
                complete: () => {
                    btn.dismiss();
                }
            });
    }

    resetForm() {
        this.router.navigateByUrl('/store/goods');
        setTimeout(() => this.router.navigateByUrl('/store/goods/detail'), 100);
    }

    resetSpecificationDetail() {
        const temp = this.goodsSpecificationDetails;
        this.goodsSpecificationDetails = [];
        const trs = this.getSpecificationTr();
        trs.forEach((tr) => {
            const detail = {
                specificationTitleIndexs: new Array<number>(),
                goodsPrice: 0,
                goodsStocks: 0,
                isActive: 0,
            };

            // 生成虚拟规格实际分布列表
            const tds = this.goodsSpecifications.map((_, i) => {
                const fullItems = this.getSpecificationNameFullItems(i);
                return fullItems[tr].index;
            });
            detail.specificationTitleIndexs.push(...tds);
            // const oldData = temp.find(item => item.specificationTitleIndexs.toString() === detail.specificationTitleIndexs.toString());
            // if (oldData !== undefined) {
            //     detail.goodsPrice = oldData.goodsPrice;
            //     detail.goodsStocks = oldData.goodsStocks;
            //     detail.isActive = oldData.isActive;
            // }
            this.goodsSpecificationDetails.push(detail);
        });
    }

    getSpecificationNameFullItems(index: number): { name: string, index: number }[] {
        const rowspan = this.getRowsapn(index);
        const fullItems: { name: string, index: number }[] = [];
        const realItems = this.getNameWithIndexs(index);
        realItems.forEach((item, i) => {
            for (let j = 0; j < rowspan; j++) {
                fullItems.push({ name: item.name, index: item.index });
            }
        });
        return fullItems;
    }

    getSpecificationTr(): number[] {
        if (this.goodsSpecifications.length === 0) {
            return [];
        }
        let count = 1;
        const trs = new Array<number>();
        let j = 0;
        this.goodsSpecifications.slice(0).forEach(goodsSpecification => {
            count *= goodsSpecification.specificationNames.length;
        });
        for (let i = 0; i < count; i++) {
            trs.push(j++);
        }
        return trs;
    }

    getSpecificationTd(index: number): { rowspan: number, name: string }[] {
        const tds = new Array<{ rowspan: number, name: string }>();
        this.goodsSpecifications.forEach((specification, i) => {
            const rowspan = this.getRowsapn(i);
            const names = this.getNames(i);
            const offset = index % rowspan;
            if (offset === 0) {
                tds.push({ rowspan, name: names[index / rowspan] });
            }
        });
        return tds;
    }

    getRowsapn(index: number): number {
        let count = 1;
        this.goodsSpecifications.slice(index + 1).forEach(goodsSpecification => {
            count *= goodsSpecification.specificationNames.length;
        });
        return count;
    }

    getNames(index: number): string[] {
        let count = 1;
        const names = new Array<string>();
        this.goodsSpecifications.slice(0, index).forEach(goodsSpecification => {
            count *= goodsSpecification.specificationNames.length;
        });
        for (let i = 0; i < count; i++) {
            names.push(...this.goodsSpecifications[index].specificationNames);
        }
        return names;
    }

    getNameWithIndexs(index: number): { name: string, index: number }[] {
        let count = 1;
        const items = new Array<{ name: string, index: number }>();
        this.goodsSpecifications.slice(0, index).forEach(goodsSpecification => {
            count *= goodsSpecification.specificationNames.length;
        });
        for (let i = 0; i < count; i++) {
            this.goodsSpecifications[index].specificationNames.forEach((name, j) => {
                items.push({ name, index: j });
            });
        }
        return items;
    }

    trackFunc(index: number, item: any): number { return 0; }

}
