import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuModels = [];

  menuConfig = {
    SMALL_LOGO: 'assets/images/angular.svg',
    FULL_LOGO: 'assets/images/logo.png',
    BACKGROUND_IMAGE_SRC: 'url(https://picsum.photos/300/800)',
    BACKGROUND_COLOR: 'white',
    DEFAULT_TEXT_COLOR: '#000000ad',
    MODEL_TITLE_COLOR: 'black',
    LINE_COLOR: 'rgba(200, 200, 200,.3)',
    ACTIVE_TEXT_THEME: 'dark',
  };

  constructor() {
    this.menuModels = this.formatMenuData([
      {
        title: '模块名称一',
        menus: [
          {
            icon: '',
            title: '菜单群组一',
            image: 'https://img.icons8.com/color/48/000000/restaurant-menu.png',
            children: [
              {
                title: '菜单一',
                url: ''
              },
              {
                title: '菜单二',
                url: ''
              },
              {
                title: '菜单三',
                url: ''
              },
            ]
          },
          {
            icon: '',
            title: '菜单群组二',
            image: 'https://img.icons8.com/color/48/000000/nintendo-64.png',
            children: [
              {
                title: '菜单四',
                url: ''
              }
            ]
          },
        ]
      }, {
        title: '模块名称二',
        menus: [
          {
            icon: '',
            title: '菜单群组三',
            image: 'https://img.icons8.com/color/48/000000/discord-new-logo.png',
            children: [
              {
                title: '菜单五',
                url: ''
              },
              {
                title: '菜单六',
                url: ''
              }
            ]
          }
        ]
      }
    ]);
  }

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
