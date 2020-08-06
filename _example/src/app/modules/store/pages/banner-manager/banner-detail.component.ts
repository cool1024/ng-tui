import { Component } from '@angular/core';
import { Banner } from '../../interfaces/banner.interface';
import { ModalService } from 'ng-tui';
import { BannerService } from '../../services/banner.service';
import { GlobalService } from '../../../../cores/services';

@Component({
    template: `
        <div class="modal-header">
            <h5 class="modal-title">幻灯片</h5>
            <button (click)="modal.dismiss()" type="button" class="close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <img *ngIf="!uploading" class="w-100" [src]="banner.bannerSrc">
            <div *ngIf="uploading" style="height:300px;">
                <ts-table-load [display]="uploading"></ts-table-load>
            </div>
            <div class="input-group mt-2">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-white">链接</span>
                </div>
                <input [(ngModel)]="banner.bannerLink" type="text" class="form-control" placeholder="请输入幻灯片链接">
            </div>
        </div>
        <div class="modal-footer">
            <input tsFile accept="image/*" #inputFile="tsFile" (fileChange)="uploadBanner($event)">
            <button tsBtn (click)="modal.dismiss()">取消/返回</button>
            <button tsBtn color="primary" (click)="inputFile.openFileDialog()">
                <i class="iconfont icon-pic mr-1"></i>选择图片
            </button>
            <button tsBtn loading (submit)="confirmSave($event)" color="success">确认保存</button>
        </div>`,
})
export class BannerDetailComponent {

    banner: Banner;

    uploading = false;

    constructor(
        public global: GlobalService,
        public modal: ModalService,
        private bannerService: BannerService,
    ) { }

    /**
     * 上传幻灯片
     * @param file 文件对象
     */
    uploadBanner(file: File) {
        this.uploading = true;
        this.bannerService.uploadBanner(file).subscribe(res => {
            this.uploading = false;
            this.banner.bannerSrc = res;
        });
    }

    confirmSave(btn: any) {
        (this.banner.id > 0 ? this.bannerService.updateBanner(this.banner) : this.bannerService.insertBanner(this.banner))
            .subscribe({
                next: () => this.modal.close(),
                complete: () => btn.dismiss()
            });
    }
}
