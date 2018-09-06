import { Component, OnInit } from '@angular/core';
import { ToastService, UploadConfig } from 'ng-tui';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GlobalService } from '../../../../cores/services';
import { PlatformService } from '../../services/platform.service';
import { PlatformManager } from '../../interfaces/platform.interfaces';
import { ApiData } from '../../../../cores/classes';
import { skipWhile, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-platform-detail',
    templateUrl: './platform-detail.component.html',
    styleUrls: ['./platform-detail.component.scss']
})
export class PlatformDetailComponent implements OnInit {

    platformManager: PlatformManager = { id: 0, isActive: 1 };

    options: UploadConfig;

    constructor(
        public global: GlobalService,
        private active: ActivatedRoute,
        private toast: ToastService,
        private platformService: PlatformService,
    ) {
        this.active.paramMap
            .pipe(skipWhile(params => !params.has('id')), switchMap<ParamMap, ApiData>(params => {
                this.platformManager.id = parseInt(params.get('id'), 10);
                return this.platformService.getPlatformManager(this.platformManager.id);
            }))
            .subscribe(res => this.platformManager = res.datas);
    }

    ngOnInit() {
    }

    /**
     * 确认添加
     */
    confirmInsert(btn: any) {
        this.platformService.insertPlatformManager(this.platformManager).subscribe({
            next: res => {
                this.toast.success('添加成功', `成功添加管理员${this.platformManager.platformManagerName}`);
            },
            complete: () => {
                btn.dismiss();
            }
        });
    }

    /**
     * 确认修改
     */
    confirmUpdate(btn: any) {
        this.platformService.updatePlatformManager(this.platformManager).subscribe({
            next: res => {
                this.toast.success('修改成功', `成功修改管理员${this.platformManager.platformManagerName}的信息`);
            },
            complete: () => {
                btn.dismiss();
            }
        });
    }
}
