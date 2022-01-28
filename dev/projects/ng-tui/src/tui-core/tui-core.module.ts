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
import { HostDirective } from './directive/host.directive';
import { ViewComponent } from './component-creator/view.component';
import { ViewService } from './component-creator/view.service';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ToggleDirective,
    TsHoverDirective,
    HostDirective,
    ViewDirective,
    ViewComponent,
    RequestPipe
  ],
  providers: [
    ValueChangeListenerService,
    ConfigService,
    ComponentService,
    ComponentHandleService,
    ViewService,
  ],
  exports: [
    ToggleDirective,
    TsHoverDirective,
    HostDirective,
    ViewDirective,
    RequestPipe,
    CommonModule,
  ],
})
export class TUICoreModule { }
