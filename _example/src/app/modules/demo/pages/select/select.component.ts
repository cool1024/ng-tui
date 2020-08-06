import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GlobalService, RequestService } from '../../../../cores/services';
import { ItemTree } from 'ng-tui';
@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements AfterViewInit {

    private cityPickerInstance: any;

    // @ViewChild('cityPicker') set cityPicker(elementRef: ElementRef) {
    //     const $ = this.global.getWindowObject('$');
    //     this.cityPickerInstance = $(elementRef.nativeElement);
    //     this.cityPickerInstance.citypicker();
    // }

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

    chinaOptions = new Array<ItemTree>();

    departmentOptions: Array<ItemTree> = [{
        value: 1,
        text: '董事长',
        children: [
            { value: 2, text: '董事长助理' },
            {
                value: 3, text: '执行董事兼总经理',
                children: [
                    {
                        value: 4, text: '副总经理',
                        children: [
                            { value: '5', text: '执行部' },
                            { value: '5', text: '行政部' },
                            { value: '5', text: '财务部' },
                            { value: '5', text: '操作部' },
                            { value: '5', text: '安技部门' },
                        ]
                    },
                ]
            },
        ]
    }];

    selectValue = 'Brussels';

    selectValues = [1, 2];

    cityValue = ['11', '1101', '110101'];

    constructor(public global: GlobalService, private request: RequestService) {
        request.text('/devexample/china').subscribe(res => {
            this.chinaOptions = JSON.parse(res);
        });
    }

    getPickerValue() {
        alert('选中的值为' + this.cityPickerInstance.val());
    }

    ngAfterViewInit() {
        // 必须在视图初始化完成后才能设置省市区选择的默认选中值
        // this.cityPickerInstance.citypicker('destroy');
        // this.cityPickerInstance.citypicker({
        //     province: '江苏省',
        //     city: '常州市',
        //     district: '溧阳市'
        // });
    }
}
