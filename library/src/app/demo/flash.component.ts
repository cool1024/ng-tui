import { Component, OnDestroy } from '@angular/core';
import { MenuService, Pagination } from '../../../projects/ng-tui/src/public_api';

@Component({
    selector: 'demo-flash',
    template: `
    <div class="card">
        <table [tsLoad]="page.loading" class="table table-striped table-hover table-bordered mb-0">
            <thead class="thead-light"><tr><th *ngFor="let th of theads" scope="col">{{th}}</th></tr></thead>
            <tbody>
                <tr class="pointer mat-cell" [class.table-info]="activeRow===row" *ngFor="let row of tableRows;index as i">
                    <td (click)="activeRow=row">{{i+1}}</td>
                    <td>
                        <img class="rounded-circle border shadow-sm" height="40" width="40" [src]="row.img"/>
                    </td>
                    <td>{{row.title}}</td>
                    <td>{{row.time}}</td>
                    <td>
                        <span *ngIf="row.isActive===1" class="badge badge-success">正常</span>
                        <span *ngIf="row.isActive===0" class="badge badge-danger">异常</span>
                    </td>
                    <td>
                        <span (click)="showMenu($event.target)" class="btn-icon btn-icon-primary" tsTip="操作">
                            <i tsIcon="viewgallery"></i>
                        </span>
                        <span class="btn-icon btn-icon-info" tsTip="详情/编辑">
                            <i tsIcon="eye"></i>
                        </span>
                        <span class="btn-icon btn-icon-danger" tsTip="删除">
                            <i tsIcon="delete"></i>
                        </span>
                    </td>
                </tr>
                <tr class="bg-white">
                    <td [attr.colspan]="theads.length" class="text-right">
                        <ts-pagination [(pagination)]="page" (pageChange)="loadData()" color="info" goTitle="跳转"></ts-pagination>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`
})
export class FlashComponent implements OnDestroy {
    theads = ['#', 'Img', 'Title', 'Time', 'IsActive', 'Opt'];
    activeRow = null;
    page = new Pagination();
    tableRows = [
        { img: 'https://randomuser.me/api/portraits/thumb/women/1.jpg', title: 'Mark', time: '18点32分', isActive: 1 },
        { img: 'https://randomuser.me/api/portraits/thumb/women/2.jpg', title: 'Jacob', time: '18点32分', isActive: 0 },
        { img: 'https://randomuser.me/api/portraits/thumb/women/3.jpg', title: 'Otto', time: '18点32分', isActive: 1 },
        { img: 'https://randomuser.me/api/portraits/thumb/women/4.jpg', title: 'Thornton', time: '18点32分', isActive: 0 },
        { img: 'https://randomuser.me/api/portraits/thumb/women/5.jpg', title: 'Larry the Bird', time: '18点32分', isActive: 1 }
    ];

    constructor(private menu: MenuService) {

    }

    showMenu(dom: HTMLElement) {
        this.menu.showMenu(dom, ['行为动作', '另一种操作', '', '有一些东西在这'], {
            position: 'auto',
            offsetX: -50,
            offsetY: 5
        }).subscribe(item => {
            console.log(item.value);
        });
    }

    loadData() {
        this.page.loading = true;
        setTimeout(() => this.page.loading = false, 2000);
    }

    ngOnDestroy() {
        console.log(22222);
    }
}
