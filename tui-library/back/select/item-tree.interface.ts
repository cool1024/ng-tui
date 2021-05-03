export interface ItemTree {
    value: any;
    text: string;
    content?: string;
    children?: Array<ItemTree>;
}
