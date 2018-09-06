import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService, UploadConfig } from 'ng-tui';
import { GlobalService, AuthService } from '../../../../cores/services';
import { ManagerService } from '../../services/manager.service';
import { Manager } from '../../interfaces/manager.interface';

@Component({
    templateUrl: './manager-detail.component.html',
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class ManagerDetailComponent implements OnInit {

    manager: Manager = { account: '', avatar: '' };

    options: UploadConfig;

    constructor(
        public global: GlobalService,
        private toast: ToastService,
        private managerService: ManagerService,
        public location: Location,
        private auth: AuthService,
    ) {
        this.options = {
            queryString: '?x-oss-process=image/resize,h_130,w_130',
            uploader: (file: File) => this.managerService.uplodaAvatar(file),
        };
    }

    ngOnInit() {
        this.managerService.getManagerInfo()
            .subscribe(res => this.manager = res.datas);
    }

    /**
     * 确认修改
     */
    confirmUpdate(btn: any) {
        this.managerService.updateManagerInfo(this.manager).subscribe({
            next: () => {
                this.toast.success('修改成功', `成功修改账户信息`);
                this.auth.user.avatar = this.manager.avatar;
            },
            complete: () => {
                btn.dismiss();
            }
        });
    }
}
