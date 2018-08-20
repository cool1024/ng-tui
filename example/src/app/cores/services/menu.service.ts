import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    menuModels = new Array<any>();

    constructor() { }

    /**
     * 加载系统菜单
     */
    loadMenu(datas: any): any {

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
