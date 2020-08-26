import { Injectable, Inject } from '@angular/core';
import { TUIConfig } from '../interfaces/config.interface';

@Injectable()
export class ConfigService {

    constructor(@Inject('TUI_CONFIG') public config: TUIConfig) {
        this.config = Object.assign({
            iconfontPrefix: 'iconfont',
            iconfontSymbolPrefix: 'icon',
            iconfontLoadingClass: ['iconfont-rotate'],
            buttonLoadingIcon: 'loading',
            defaultColor: 'primary',
            confirmCancelTitle: 'Cancel',
            confirmOkTitle: 'Confirm',
            uploadItemSize: 120,
            weekTitles: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthTitles: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            pickerConfirmTitle: 'OK',
            pickerCancelTitle: 'Cancel',
            pickerCleanTitle: 'Clean',
            pickerNowTitle: 'Now',
            pickerNowYearTitle: 'Now',
            paginationItems: [],
            paginationLimitTextFormat: (limit: number) => `Show ${limit} rows`,
            tableConfig: {
                emptyTitle: 'Empty~',
                goTitle: 'Go'
            }
        }, config);
    }

}
