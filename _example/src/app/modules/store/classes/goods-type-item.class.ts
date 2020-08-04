import { GoodsType } from './../interfaces/goods-type.interface';
export class GoodsTypeItem {

    childTypes: GoodsType[];

    isSaved: boolean;

    constructor(public mainType: GoodsType) {
        this.isSaved = true;
        this.childTypes = new Array<GoodsType>();
    }

    append(...goodsType: GoodsType[]) {
        goodsType = goodsType.map(type => {
            type.parentId = this.mainType.id;
            return type;
        });
        this.childTypes.push(...goodsType);
    }

    setEdit() {
        this.isSaved = false;
    }

    setSave() {
        this.isSaved = true;
    }

    getDataParams(): { id: number, goodsTypeTitle: string, children: GoodsType[] } {
        return {
            id: this.mainType.id,
            goodsTypeTitle: this.mainType.goodsTypeTitle,
            children: this.childTypes
        };
    }
}
