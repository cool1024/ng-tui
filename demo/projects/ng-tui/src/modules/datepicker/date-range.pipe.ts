import { Pipe, PipeTransform } from '@angular/core';
import { DateRange } from './date-range.interface'

@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {

    transform(value: DateRange, split: string): string {
        return value !== undefined && value !== null ? `${value.start}${split}${value.end}` : '';
    }

}