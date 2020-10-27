import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GithubApi } from './api';

@Component({
    templateUrl: './github-detail.html'
})
export class GithubDetailPage {

    projectDetail = {};

    constructor(api: GithubApi, activatedRoute: ActivatedRoute) {
        activatedRoute.queryParams.pipe(switchMap(params => api.projectDetail(params.id)))
            .subscribe(res => this.projectDetail = res)
    }
}