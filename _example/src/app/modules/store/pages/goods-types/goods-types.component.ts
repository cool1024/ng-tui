import { Component, OnInit } from '@angular/core';
import { GoodsTypeItem } from './../../classes/goods-type-item.class';
import { ConfirmService, ToastService } from 'ng-tui';
import { GoodsTypeService } from '../../services/goods-type.service';

@Component({
    selector: 'app-goods-types',
    templateUrl: './goods-types.component.html',
})
export class GoodsTypesComponent implements OnInit {

    list = new Array<GoodsTypeItem>();

    constructor(
        private confirm: ConfirmService,
        private toast: ToastService,
        private goodsTypeService: GoodsTypeService,
    ) { }

    ngOnInit() {
        this.loadDatas();
    }

    loadDatas() {
        this.list = [];
        this.goodsTypeService.listGoodsType().subscribe(res => {
            const groups: { parents: any[], children: any[] } = res.datas;
            groups.parents.forEach(parent => {
                const goodsTypeItem = new GoodsTypeItem({
                    id: parent.id,
                    parentId: 0,
                    goodsTypeTitle: parent.goodsTypeTitle,
                    createdAt: parent.createdAt
                });
                const children = groups.children.find(child => {
                    return child.parentId === parent.id;
                });
                if (children !== undefined) {
                    goodsTypeItem.append(...children.groups);
                }
                this.list.push(goodsTypeItem);
            });
        });
    }

    addChildType(typeItem: GoodsTypeItem) {
        typeItem.append({ id: 0, goodsTypeTitle: '新增类型', level: 0 });
        typeItem.setEdit();
    }

    deleteChildType(typeItem: GoodsTypeItem, index: number) {
        if (typeItem.childTypes[index].id === 0) {
            typeItem.childTypes.splice(index, 1);
            return;
        }
        this.confirm.danger('确认删除', `确认删除分类：'${typeItem.childTypes[index].goodsTypeTitle}'`)
            .subscribe(() => {
                this.goodsTypeService.deleteGoodsType(typeItem.childTypes[index].id)
                    .subscribe(() => {
                        this.toast.success('删除成功', `成功删除分类：'${typeItem.childTypes[index].goodsTypeTitle}'`);
                        typeItem.childTypes.splice(index, 1);
                    });
            });
    }

    addType() {
        const typeItem = new GoodsTypeItem({ id: 0, level: 0, goodsTypeTitle: '新增上级分类', createdAt: '暂无创建时间' });
        typeItem.setEdit();
        this.list.push(typeItem);
    }

    deleteType(typeItem: GoodsTypeItem, index: number) {
        if (typeItem.mainType.id === 0) {
            this.list.splice(index, 1);
            return;
        }
        this.confirm.danger('确认删除', `确认删除分类：'${typeItem.mainType.goodsTypeTitle}',分类下的所有子分类都会被删除!`)
            .subscribe(() => {
                this.goodsTypeService.deleteGoodsType(typeItem.mainType.id)
                    .subscribe(() => {
                        this.toast.success('删除成功', `成功删除分类：'${typeItem.mainType.goodsTypeTitle}'`);
                        this.list.splice(index, 1);
                    });
            });
    }

    confirmSave(typeItem: GoodsTypeItem) {
        this.goodsTypeService.saveGoodsType(typeItem).subscribe(res => {
            this.toast.success('保存成功', '成功保存商品类型');
            this.loadDatas();
            // typeItem.setSave();
        });
    }

}
