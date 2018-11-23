import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillDirective } from './quill.directive';
import { ScriptService } from './../../tui-core/base-services/script.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        QuillDirective,
    ],
    exports: [
        CommonModule,
        QuillDirective
    ],
    providers: [
        ScriptService
    ]
})
export class QuillModule {

    static forChild(srcs: string[]): ModuleWithProviders {
        return {
            ngModule: QuillModule,
            providers: [
                { provide: 'QUILL_SCRIPT_SRCS', useValue: srcs }
            ]
        };
    }

    static forRoot(srcs: string[]): ModuleWithProviders {
        return {
            ngModule: QuillModule,
            providers: [
                { provide: 'QUILL_SCRIPT_SRCS', useValue: srcs }
            ]
        };
    }
}
