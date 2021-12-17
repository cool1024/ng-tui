import { Component } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  constructor() {}

  // changeMenuMode() {
  //     this.dashboardService.menuMode = !this.dashboardService.menuMode;
  // }

  // changeFullscreen() {
  //     this.uiService.toggleFullScreen();
  // }

  // showLanguageMenu(dom: HTMLElement) {
  //     this.menuService.showMenu(
  //         dom,
  //         [
  //             DropMenuItem.image('简体中文', 'assets/image/flags/cn.gif', 1),
  //             DropMenuItem.image('日本语', 'assets/image/flags/jp.gif', 2),
  //             DropMenuItem.image('English', 'assets/image/flags/en.gif', 3)
  //         ],
  //         { position: Position.AUTO, offsetY: 10 }
  //     ).subscribe();
  // }

  // showUserMenu(dom: HTMLElement) {
  //     const menuItems = [
  //         DropMenuItem.label('Administrator', 'iconfont icon-account'),
  //         DropMenuItem.label('012-9832-321', 'iconfont icon-mobile'),
  //         DropMenuItem.label('Settings', 'iconfont icon-set'),
  //         DropMenuItem.split(),
  //         DropMenuItem.label('Logout', 'iconfont icon-out')
  //     ];
  //     const menuConfig = { position: Position.AUTO, offsetX: -100, offsetY: 10 };
  //     this.menuService.showMenu(dom, menuItems, menuConfig).subscribe(res => {
  //         if (res.index === 2) {
  //             this.uiService.navUrl('/admin');
  //         }
  //         if (res.index === 4) {
  //             this.dashboardService.cleanLoginStatus();
  //             this.dashboardService.showLogin(loginConfig);
  //         }
  //     });
  // }
}
