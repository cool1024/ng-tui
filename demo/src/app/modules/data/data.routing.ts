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


export const declarationComponents = [
    ServerMapComponent
];

export const entryComponents = [];

const routes = declarationComponents.map(component => ({
    path: component.name, component
}));

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataRoutingModule { }
