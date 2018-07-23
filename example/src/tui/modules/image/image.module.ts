import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from './../../commons/common.module';
import { ImageConfig } from './image.config';
import { ImageDirective } from './image.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ImageDirective,
    ],
    exports: [
        CommonModule,
        ImageDirective,
    ],
    providers: [
        ImageConfig,
    ]
})
export class ImageModule {

    public static forRoot(config?: { default?: string }): ModuleWithProviders {
        return {
            ngModule: ImageModule,
            providers: [
                { provide: ImageConfig, useValue: config }
            ]
        };
    }
}
