import { Component } from '@angular/core';
import { Item, Pagination, SearchParams, TableComponent, ToastService } from 'projects/ng-tui/src/public_api';
import { of } from 'rxjs';
import { GithubApi } from './api';

@Component({
    templateUrl: './github-search.html'
})
export class GithubSearchPage {

    sortItems: string[] = [
        'best match',
        'stars',
        'forks',
        'help-wanted-issues'
    ];

    constructor(private api: GithubApi, private toast: ToastService) { }

    dataLoader = (page: Pagination, search: SearchParams) => {
        if (search.isEmptyKey('q')) {
            this.toast.danger('Error', 'Please input your search key!');
            return of({ result: false });
        } else {
            return this.api.searchProject(page, search);
        }
    }

    doSort(table: TableComponent, item: Item) {
        table.search.sort = item.value;
        table.doSearch();
    }

}