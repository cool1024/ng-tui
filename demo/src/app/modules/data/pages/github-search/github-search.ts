import { Component } from '@angular/core';
import { Pagination, SearchParams, ToastService } from 'projects/ng-tui/src/public_api';
import { of } from 'rxjs';
import { GithubApi } from './api';

@Component({
    templateUrl: './github-search.html'
})
export class GithubSearchPage {

    constructor(private api: GithubApi, private toast:ToastService) { }

    dataLoader = (page: Pagination, search: SearchParams) => {
        if (search.isEmptyKey('q')) {
            this.toast.danger('Error','Please input your search key!');
            return of({ result: false });
        }else{
            return this.api.searchProject(page, search);
        }
    }

}