import { NgModule, ModuleWithProviders } from '@angular/core';
import { ChartDirective } from './chart.directive';
import { ScriptService } from '../../tui-core/base-services/script.service';

@NgModule({
    exports: [ChartDirective],
    declarations: [ChartDirective],
    providers: [ScriptService]
})
export class ChartModule {
    public static forRoot(scripts?: string[]): ModuleWithProviders {
        return {
            ngModule: ChartModule,
            providers: [
                { provide: 'TUI_CHART_CONFIG', useValue: scripts || [] }
            ]
        };
    }
}
