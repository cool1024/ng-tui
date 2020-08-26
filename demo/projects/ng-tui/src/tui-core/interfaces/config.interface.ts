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
    pickerCancleTitle?: string;
    pickerNowTitle?:string;
    pickerNowYearTitle?:string;
    pickerCleanTitle?:string;

    paginationItems?: Item[];

    paginationLimitTextFormat?: (limit: number) => string;

    uploadItemSize?: number;

    tableConfig?: TableConfig
}

export interface TableConfig {
    emptyTitle: string;
    goTitle: string;
}
