import { NgModule } from '@angular/core';
import { UploadDirective } from './upload.directive';
import { UploadComponent } from './upload.component';
import { TUICoreModule } from '../../tui-core/tui-core.module';

@NgModule({
    imports: [
        TUICoreModule
    ],
    declarations: [
        UploadDirective,
        UploadComponent
    ],
    exports: [
        UploadDirective,
        UploadComponent
    ]
})
export class UploadModule { }
