import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CkeditorComponent } from './ckeditor.component';
import { ScriptService } from '../../tui-core/base-services/script.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CkeditorComponent,
    ],
    exports: [
        CommonModule,
        CkeditorComponent
    ],
    providers: [
        ScriptService
    ]
})
export class CkeditorModule {
    static forRoot(srcs: string[]): ModuleWithProviders {
        return {
            ngModule: CkeditorModule,
            providers: [
                { provide: 'CKEDITOR_SCRIPT_SRCS', useValue: srcs }
            ]
        };
    }
    static forChild(srcs: string[]): ModuleWithProviders {
        return {
            ngModule: CkeditorModule,
            providers: [
                { provide: 'CKEDITOR_SCRIPT_SRCS', useValue: srcs }
            ]
        };
    }
}
