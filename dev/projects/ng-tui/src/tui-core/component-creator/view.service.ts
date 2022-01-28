import { Injectable, Type } from "@angular/core";
import { TUI_CONST } from "../const";
import { ToggleDirective } from "../directive/toggle.directive";
import { ComponentService } from "./component.service";
import { ComponentHandle } from "./handle.class";
import { ViewComponent } from "./view.component";
import { ViewOption } from "./view.interface";

@Injectable()
export class ViewService {

    constructor(private cmp: ComponentService) { }

    create(toggle: ToggleDirective, content: Type<any>, option?: ViewOption): ComponentHandle {
        const handle = this.cmp.createWithAttachView(ViewComponent, toggle.dom);
        const instance = handle.instance as ViewComponent;
        const viewOption = option || { fitWidth: false, zIndex: 1, offsetX: 0, offsetY: 0, position: TUI_CONST.POSITION.AUTO };
        instance.viewOption = viewOption;
        instance.toggle = toggle;
        instance.loadComponent(content, handle);
        return handle;
    }
}