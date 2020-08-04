import { GoodsType } from './goods-type.interface';


// export interface GoodsSpecifications {
//     id?: number;
//     specificationName: string;
//     colorName?: string;
//     price?: number;
//     stocks?: number;
// }

export interface GoodsSpecificationDetail {
    specificationTitles: string[];
    goodsPrice: number;
    goodsStocks: number;
    isActive: number;
}

export interface GoodsSpecification {
    specificationTitle: string;
    specificationNames: string[];
}

export interface Goods {
    id?: number;
    goodsPrice?: number;
    goodsStocks?: number;
    goodsParentType?: number;
    goodsType?: number;
    goodsThumb?: string;
    goodsImages?: string;
    goodsDetail?: string;
    goodsName: string;
    isActive: number;
}

