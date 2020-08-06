import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiData } from '../classes';
import { RequestService } from './request.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class MenuService {

    menuModels = new Array<any>();

    constructor(private request: RequestService) { }

    loadMenu(): Observable<ApiData> {
        this.menuModels = [];
        return this.request.url('/managerapi/menu').pipe(tap(res => {
            this.menuModels = this.formatMenuData(res.datas);
        }));
    }

    /**
     * 加载系统菜单
     */
    formatMenuData(datas: any): any {

        this.menuModels = [];
        const menus = datas;
        menus.forEach(model => {
            const menuModel = {
                modelTitle: model.title,
                menuGroups: new Array<any>(),
                active: false
            };
            model.menus.forEach(menu => {
                const menuGroup: any = {
                    groupTitle: menu.title,
                    icon: menu.icon,
                    image: menu.image,
                    menuItems: new Array<any>(),
                    targetModel: menuModel,
                    active: false
                };
                menu.children.forEach(child => {
                    const menuItem: any = {
                        title: child.title,
                        url: child.url,
                        targetGroup: menuGroup,
                        active: false
                    };

                    menuGroup.menuItems.push(menuItem);
                });
                menuModel.menuGroups.push(menuGroup);
            });
            this.menuModels.push(menuModel);
        });
        return this.menuModels;
    }
}
