import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../tui-core/base-services/script.service';
import { BaseEchartDirective } from './echart.directive';

declare const window: any;

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BaseEchartDirective
    ],
    exports: [
        CommonModule,
        BaseEchartDirective
    ],
    providers: [
        ScriptService
    ]
})
export class EChartModule {
    static forRoot(src: string): ModuleWithProviders {
        return {
            ngModule: EChartModule,
            providers: [
                { provide: 'ECHART_SCRIPT_SRC', useValue: src }
            ]
        };
    }
    static forChild(src: string): ModuleWithProviders {
        return {
            ngModule: EChartModule,
            providers: [
                { provide: 'ECHART_SCRIPT_SRC', useValue: src }
            ]
        };
    }
}
