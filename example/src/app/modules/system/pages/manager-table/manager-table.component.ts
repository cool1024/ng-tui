/**
 * 管理员列表
 *
 * @author cool1024
 * @file   manager-table.component.ts
 * @date   2018-12-11 18:28:06
 */
import { Component, OnInit } from '@angular/core';
import { SearchParams, ApiData } from 'src/app/cores/classes';
import { Pagination, ModalService, ConfirmService, ToastService } from 'ng-tui';
import { ManagerService } from '../../services/manager.service';
import { GlobalService } from 'src/app/cores/services';
import { ManagerInfoModalComponent } from './manager-info-modal.component';
import { Manager } from '../../interfaces/manager.interface';
import { switchMap } from 'rxjs/operators';

@Component({
    templateUrl: './manager-table.component.html',
    styleUrls: ['./manager-table.component.scss']
})
export class ManagerTableComponent implements OnInit {

    // 查询参数
    search = new SearchParams();

    // 分页参数
    page = new Pagination();

    // 表格数据列表
    tableRows = [];

    // 表格标题
    theads = ['序号', '头像', '账号', '角色', '是否启用', '创建时间', '操作'];

    // 角色下拉选项
    roleOptions = [];

    constructor(
        private service: ManagerService,
        public global: GlobalService,
        private modal: ModalService,
        private confirm: ConfirmService,
        private toast: ToastService,
    ) { }

    ngOnInit() {
        // 载入表格数据
        this.pageChanged();
        // 载入角色下拉选项
        this.service.getRoleOptions().subscribe(items => this.roleOptions = items);
    }

    getRoleName(roleId: number) {
        return (this.roleOptions.find(role => role.value === roleId) || { text: '加载中' }).text;
    }

    /**
     * 显示添加/编辑窗口
     */
    showInfoModal(userDetail?: Manager) {
        const modalHandle = this.modal.create(ManagerInfoModalComponent, { center: true });
        modalHandle.instance.userDetail = Object.assign({}, userDetail || { id: 0 });
        modalHandle.open().subscribe(() => this.pageChanged());
    }

    confirmDelete(userDetail: Manager) {
        this.confirm.danger('确认操作', `您确认删除帐户'${userDetail.account}',操作不可恢复！？`)
            .pipe(switchMap<void, ApiData>(() => this.service.deleteManagerAccount(userDetail.id)))
            .subscribe(res => {
                this.toast.success('删除成功', `成功删除帐户‘${userDetail.account}’！`);
                this.pageChanged();
            });
    }

    changeActive(userDetail: Manager, status: number) {
        this.service.updateManagerAccount({
            id: userDetail.id,
            isActive: status
        }).subscribe(() => {
            this.toast.success('删除成功', `成功${status === 1 ? '启用' : '禁用'}帐户'${userDetail.account}'！`);
        });
    }

    pageChanged() {
        this.page.loading = true;
        this.service.getManagerList(this.page, this.search).subscribe({
            next: res => {
                this.page.total = res.datas.total;
                this.tableRows = res.datas.rows;
            },
            complete: () => this.page.loading = false
        });
    }

    doReset() {
        this.page.reset();
        this.search.clean();
        this.pageChanged();
    }

    doSearch() {
        this.pageChanged();
    }
}
