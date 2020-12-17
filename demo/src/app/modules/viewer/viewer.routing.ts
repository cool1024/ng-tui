/**
 * Demo Routing
 *
 * @author cool1024
 * @file   viewer.routing.ts
 * @date   2020-12-18 14:33:30
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteUtil } from '../../../util/route';
import { DirComponent} from './pages/dir/dir.component';
import { Api} from './services/api';

export const providers = [
    Api
];

export const declarationComponents = [
    DirComponent
];

const routes = RouteUtil.generateRoutesFromComponents(declarationComponents);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewerRoutingModule { }
