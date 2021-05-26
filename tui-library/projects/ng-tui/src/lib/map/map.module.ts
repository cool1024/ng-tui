import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDirective } from './map.directive';
import { MapService } from './map.service';
import { MapConfig } from './map.config';
import { ScriptService } from '../../tui-core/service/script.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MapDirective
    ],
    exports: [
        MapDirective
    ],
    providers: [
        ScriptService,
    ]
})
export class MapModule {
    public static forRoot(appKey: string): ModuleWithProviders<MapModule> {
        return {
            ngModule: MapModule,
            providers: [
                { provide: MapConfig, useValue: { appKey } },
                MapService,
            ]
        };
    }
    public static forChild(appKey: string): ModuleWithProviders<MapModule> {
        return {
            ngModule: MapModule,
            providers: [
                { provide: MapConfig, useValue: { appKey } },
                MapService,
            ]
        };
    }
}