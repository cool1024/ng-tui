import { Injectable, Inject } from '@angular/core';
import { TUIConfig } from '../interface/config.interface';

@Injectable()
export class ConfigService {
  public config: TUIConfig;

  constructor(@Inject('TUI_CONFIG') diyConfig: TUIConfig) {
    this.config = Object.assign(
      {
        iconfontPrefix: 'iconfont',
        iconfontSymbolPrefix: 'icon',
        iconfontLoadingClass: ['iconfont-rotate'],
        buttonLoadingIcon: 'loading',
        defaultColor: 'primary',
        confirm: {
          confirmCancelTitle: 'Cancel',
          confirmOkTitle: 'Confirm',
          icon: {
            info: 'info',
            warning: 'warning',
            success: 'success',
            danger: 'danger',
          },
        },
        uploadItemSize: 120,
        weekTitles: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthTitles: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        pickerConfirmTitle: 'OK',
        pickerCancelTitle: 'Cancel',
        pickerCleanTitle: 'Clean',
        pickerNowTitle: 'Now',
        pickerNowYearTitle: 'Now',
        paginationItems: [
          { text: 'Show 5 rows', value: 5 },
          { text: 'Show 10 rows', value: 10 },
          { text: 'Show 20 rows', value: 20 },
        ],
        paginationLimitTextFormat: (limit: number) => `Show ${limit} rows`,
        tableConfig: {
          emptyTitle: 'Empty~',
          goTitle: 'Go',
        },
      },
      diyConfig
    ) as any;
  }
}
