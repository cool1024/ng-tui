import { Component, OnInit } from '@angular/core';
import { Banner } from '../../interfaces/banner.interface';
import { ModalService, ToastService, ConfirmService } from 'ng-tui';
import { BannerDetailComponent } from './banner-detail.component';
import { BannerService } from '../../services/banner.service';
import { switchMap } from 'rxjs/operators';
import { ApiData } from '../../../../cores/classes';

@Component({
    templateUrl: './banner-manager.component.html',
    styleUrls: ['./banner-manager.component.scss']
})
export class BannerManagerComponent implements OnInit {

    theads = ['序号', '图片', '链接', '操作'];

    list = new Array<Banner>();

    loading = false;

    constructor(
        private modal: ModalService,
        private bannerService: BannerService,
        private toast: ToastService,
        private confirm: ConfirmService,
    ) { }

    ngOnInit() {
        this.loadDatas();
    }

    loadDatas() {
        this.loading = true;
        this.bannerService.getBanners().subscribe(res => {
            this.list = res.datas;
        });
    }


    showEditModal(banner?: Banner) {
        banner = banner || { id: 0, bannerLink: '', bannerSrc: '' };
        const modal = this.modal.create(BannerDetailComponent, { center: true, scroll: 'out' });
        modal.instance.banner = banner;
        modal.open().subscribe(() => {
            this.toast.success('保存成功', '成功保存新幻灯片');
            this.loadDatas();
        });
    }

    confirmSort(btn: any) {
        this.bannerService.sortBanner(this.list.map(item => item.id)).subscribe({
            next: () => {
                this.loadDatas();
                this.toast.success('排序成功', '成功排序幻灯片');
            },
            complete: () => btn.dismiss(),
        });
    }

    confirmDelete(banner: Banner) {
        this.confirm.danger('删除确认', `您确认删除这个幻灯片吗？`)
            .pipe(switchMap<void, ApiData>(() => this.bannerService.deleteBanner(banner.id)))
            .subscribe(() => {
                this.list.splice(this.list.indexOf(banner), 1);
                this.toast.success('删除成功', `成功删除幻灯片`);
                this.loadDatas();
            });
    }
}
