/**
 * Demo Routing
 *
 * @author cool1024
 * @file   data.routing.ts
 * @date   2020-8-10 14:33:30
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerMapComponent } from './server-map/server-map.component';
import { GithubSearchPage } from './pages/github-search/github-search';
import { GithubDetailPage } from './pages/github-search/github-detail';
import { GithubApi } from './pages/github-search/api';
import { RouteUtil } from '../../../util/route';

export const providers = [
    GithubApi
];

export const declarationComponents = [
    ServerMapComponent,
    [GithubSearchPage, GithubDetailPage]
];

const routes = RouteUtil.generateRoutesFromComponents(declarationComponents);

console.table(routes);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataRoutingModule { }
