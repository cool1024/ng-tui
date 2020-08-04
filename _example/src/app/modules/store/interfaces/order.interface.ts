import { User } from './user.interface';

export interface OrderGoods {
    id: number;
    orderId: number;
    goodsId: number;
    goodsPrice: number;
    goodsSpecification: string;
    goodsThumb: string;
    goodsName: string;
    goodsQuantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: number;
    uid: number;
    orderSn: string;
    address: string;
    phone: string;
    consignee: string;
    user?: User;
    goodsList?: OrderGoods[];
    orderTotalPrice: number;
    orderStatus: number;
    createdAt: string;
    updatedAt: string;
}



