import { NgModule, ModuleWithProviders } from '@angular/core';
import { ScriptService } from '../../tui-core/service/script.service';
import { ChartDirective } from './chart.directive';

@NgModule({
    exports: [ChartDirective],
    declarations: [ChartDirective],
    providers: [ScriptService],
})
export class ChartModule {
    public static forRoot(scripts?: string[]): ModuleWithProviders<ChartModule> {
        return {
            ngModule: ChartModule,
            providers: [{ provide: 'TUI_CHART_CONFIG', useValue: scripts || [] }],
        };
    }
}
