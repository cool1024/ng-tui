import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GlobalService } from '../../../../cores/services';
@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements AfterViewInit {

    private cityPickerInstance: any;

    @ViewChild('cityPicker') set cityPicker(elementRef: ElementRef) {
        const $ = this.global.getWindowObject('$');
        this.cityPickerInstance = $(elementRef.nativeElement);
        this.cityPickerInstance.citypicker();
    }

    diySelects = [
        {
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/71.jpg"> Jane`,
            text: 'Jane',
            value: 1
        },
        {
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/72.jpg"> Rose`,
            text: 'Rose',
            value: 2
        },
        {
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/73.jpg"> Revern`,
            text: 'Revern',
            value: 3
        },
        {
            content: `<img height="30" class="rounded-circle" src="https://randomuser.me/api/portraits/thumb/women/74.jpg"> Alis`,
            text: 'Alis',
            value: 4
        }
    ];

    selectValue = 'Brussels';

    selectValues = [1, 2];

    cityValue = '';

    constructor(public global: GlobalService) { }

    getPickerValue() {
        alert('选中的值为' + this.cityPickerInstance.val());
    }

    ngAfterViewInit() {
        // 必须在视图初始化完成后才能设置省市区选择的默认选中值
        this.cityPickerInstance.citypicker('destroy');
        this.cityPickerInstance.citypicker({
            province: '江苏省',
            city: '常州市',
            district: '溧阳市'
        });
    }
}
