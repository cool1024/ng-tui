import { Item } from './item.interface';

export interface TUIConfig {
  defaultColor?: string;

  iconfontPrefix?: string;
  iconfontSymbolPrefix?: string;
  iconfontLoadingClass?: string[];

  buttonLoadingIcon?: string;

  confirm?: ConfirmConfig;

  errorImgSrc?: string;

  weekTitles?: string[];
  monthTitles?: string[];

  pickerConfirmTitle?: string;
  pickerCancleTitle?: string;
  pickerNowTitle?: string;
  pickerNowYearTitle?: string;
  pickerCleanTitle?: string;

  paginationItems?: Item[];
  paginationLimitTextFormat?: (limit: number) => string;

  uploadItemSize?: number;

  tableConfig?: TableConfig;
}

export interface ConfirmConfig {
  confirmCancelTitle?: string;
  confirmOkTitle?: string;
  icon?: {
    info: string;
    warning: string;
    success: string;
    danger: string;
  };
}

export interface TableConfig {
  emptyTitle: string;
  goTitle: string;
}
