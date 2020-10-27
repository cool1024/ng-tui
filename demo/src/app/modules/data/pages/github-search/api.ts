import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Pagination, paramToQueryString, requestObject, SearchParams } from 'projects/ng-tui/src/public_api';

@Injectable()
export class GithubApi {

    searchProject(page: Pagination, search: SearchParams) {
        const param = {
            page: page.page,
            per_page: page.limit,
            ...search.values
        }
        return requestObject(`https://api.github.com/search/repositories?${paramToQueryString(param)}`)
            .pipe(map(res => {
                return { result: true, total: res.total_count, data: res.items };
            }));
    }

    projectDetail(projectId: number) {
        return requestObject(`https://api.github.com/projects/${projectId}`)
    }
}