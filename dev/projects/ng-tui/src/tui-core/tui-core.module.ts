import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './service/config.service';
import { ToggleDirective } from './directive/toggle.directive';
import { ComponentHandleService } from './component-creator/handle.service';
import { ComponentService } from './component-creator/component.service';
import { ViewDirective } from './component-creator/view.directive';
import { ValueChangeListenerService } from './service/value-listener.service';
import { RequestPipe } from './pipes/request.pipe';
import { TsHoverDirective } from './directive/hover.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ToggleDirective, TsHoverDirective, ViewDirective, RequestPipe],
  providers: [
    ValueChangeListenerService,
    ConfigService,
    ComponentService,
    ComponentHandleService,
  ],
  exports: [
    ToggleDirective,
    TsHoverDirective,
    ViewDirective,
    RequestPipe,
    CommonModule,
  ],
})
export class TUICoreModule {}
