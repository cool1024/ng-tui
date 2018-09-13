# 分页
分页组件通常用于列表（表格）数据展示。

## 导入相关模块
在需要使用模态框页面所属模块导入ModalModule
```typescript
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ng-tui';

@NgModule({
    imports: [
        // 导入分页模块
        PaginationModule,
    ],
    declarations: [...],
    entryComponents: [...]
})
export class MyExampleModule { }
```

## 简单使用
```html
<ts-pagination  
    [pagination]="page" 
    (pageChange)="loadDatas()"
    goTitle="跳转">
</ts-pagination>
```
```typescript
import { Component } from '@angular/core';
import { Pagination } from 'ng-tui';

@Component({
    ...
})
export class ExampleComponent {

    page = new Pagination();

    constructor() { }

    /**
     * 加载数据
     */
    loadDatas(){
        // 当前分页对象数据
        console.log(this.page.pageData)
        // 分页数据附带搜索条件
        console.log(this.page.getpageDataWith({city: '南昌市'}));
    }
}
```

## 设置颜色(默认是primary)
```html
<ts-pagination
    color="success"
    [pagination]="page" 
    goTitle="跳转">
</ts-pagination>
```

## 设置每页显示数据量下拉选项
```html
<ts-pagination
    [pagination]="page" 
    [items]="[{ text: '显示 5 条', value: 5 }, { text: '显示 10 条', value: 10 }, { text: '显示 20 条', value: 20 }]"
    goTitle="跳转">
</ts-pagination>
```

## 设置跳转按钮标题
```html
<ts-pagination  
    [pagination]="page" 
    goTitle="Go">
</ts-pagination>
```

## 实际使用
```html
<div class="card">
    <!-- 表格加载动画组件 -->
    <ts-table-load [display]="pagination.loading"></ts-table-load>
    <table class="table bg-white border-0">
        <thead class="text-dark">
            <tr class="bg-light">
                <!-- 循环打印表格标题 -->
                <th *ngFor="let th of theads" class="border-0">{{th}}</th>
            </tr>
        </thead>
        <tbody>
            <!-- 循环打印表格数据 -->
            <tr *ngFor="let item of list;index as i" class="mat-cell">
                <td>{{pagination.offset + i + 1}}</td>
                <td>
                    <div class="media">
                        <img [src]="item.avatar" dataSrc="assets/images/404.jpg" alt="avatar" class="rounded-circle" height="40">
                        <div class="media-body">
                            <p class="m-0">{{item.nick}}</p>
                            <p class="m-0 text-muted">
                                <small class="text-info">{{item.email}}</small>
                            </p>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="p-0 m-0">{{item.cell}}</p>
                    <p class="p-0 m-0">{{item.address}}</p>
                </td>
                <td>
                    <p class="p-0 m-0">{{item.registered.date}}</p>
                </td>
            </tr>
            <!-- 数据为空时显示提示消息 -->
            <tr class="mat-cell" *ngIf="list.length<=0">
                <td [attr.colspan]="theads.length" class="text-center text-info">
                    暂无数据～
                </td>
            </tr>
            <!-- 分页组件 -->
            <tr class="mat-cell">
                <td [attr.colspan]="theads.length" class="text-right">
                    <ts-pagination (pageChange)="pageChanged()" [pagination]="pagination" goTitle="跳转"></ts-pagination>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'ng-tui';
import { GlobalService, RequestService } from '../../../../cores/services';
import { SearchParams } from '../../../../cores/classes';

@Component({
    templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {

    // 表格数据
    list = new Array<any>();

    // 表格标题
    theads = ['No.', '会员', '联系电话 | 住址', '注册日期', '操作'];

    // 分页参数
    pagination = new Pagination();

    // 查询参数
    search = new SearchParams({ start: '', end: '' });

    constructor(
        private reqeust: RequestService,
    ) { }

    ngOnInit() {
        this.pageChanged();
    }

    pageChanged() {

        // 开启加载动画
        this.pagination.loading = true;

        // 请求数据
        this.reqeust.get('/user/list',this.pagination.getpageDataWith(this.search.values)).subscribe({
            next: res => {
                // 页面统计
                this.page.total = res.datas.total;
                this.list = res.datas.rows;
            },
            // 关闭加载动画
            complete: () => this.pagination.loading = false
        });
    }

    doReset() {
        this.pagination.reset();
        this.pageChanged();
    }

    doSearch() {
        this.pageChanged();
    }
}
```