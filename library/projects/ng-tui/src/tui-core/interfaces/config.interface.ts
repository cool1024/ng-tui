import { Item } from './item.interface';

export interface TUIConfig {

    iconfontPrefix?: string;

    iconfontSymbolPrefix?: string;

    iconfontLoadingClass?: string[];

    buttonLoadingIcon?: string;

    defaultColor?: string;

    confirmCancelTitle?: string;

    confirmOkTitle?: string;

    errorImgSrc?: string;

    weekTitles?: string[];

    monthTitles?: string[];

    pickerConfirmTitle?: string;

    paginationItems?: Item[];

    uploadItemSize?: number;
}
