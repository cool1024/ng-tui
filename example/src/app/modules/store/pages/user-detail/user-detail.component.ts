import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../cores/services';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService, Item } from 'ng-tui';
import { ApiData } from '../../../../cores/classes';
import { switchMap, skipWhile } from 'rxjs/operators';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

    user: User;

    levelOptions = new Array<Item>();

    constructor(
        public global: GlobalService,
        private active: ActivatedRoute,
        private toast: ToastService,
        private userService: UserService,
    ) {
        this.user = { id: 0, avatar: 'assets/images/404.jpg' };
        this.active.paramMap
            .pipe(skipWhile(params => !params.has('id')), switchMap<ParamMap, ApiData>(params => {
                this.user.id = parseInt(params.get('id'), 10);
                return this.userService.getUser(this.user.id);
            })).subscribe(res => this.user = res.datas);
    }

    ngOnInit() {
        this.userService.userLevelOptions()
            .subscribe(res => this.levelOptions = res.datas);
    }

    updateUser(btn: any) {
        this.userService.updateUser(this.user).subscribe({
            next: () => this.toast.success('成功', '修改成功～'),
            complete: () => btn.dismiss()
        });
    }
}
