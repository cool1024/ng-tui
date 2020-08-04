import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../../../cores/services';
import { MenuService } from '../../services/menu.service';
import { MenuGroup, Menu } from '../../interfaces/menu.interface';
import { ModalService, ConfirmService, ToastService } from 'ng-tui';
import { MenuGroupModalComponent } from './menu-group-modal.component';
import { MenuModalComponent } from './menu-modal.component';
import { switchMap } from 'rxjs/operators';
import { ApiData } from '../../../../cores/classes';

@Component({
    templateUrl: './menu-manager.component.html',
    styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent implements OnInit {

    menuGroups = new Array<MenuGroup>();

    mainMenus = new Array<Menu>();

    childMenus = new Array<Menu>();

    activeGroup: MenuGroup;

    activeMenu: Menu;

    activeMainMenus = new Array<Menu>();

    activeChildMenus = new Array<Menu>();

    @ViewChild('tsTabs') tsTabs: any;

    constructor(
        public global: GlobalService,
        private modal: ModalService,
        private menuService: MenuService,
        private confirm: ConfirmService,
        private toast: ToastService,
    ) { }

    ngOnInit() {
        this.loadDatas();
    }

    /**
     * 重新载入数据
     */
    loadDatas() {
        this.menuService.getAllMenu().subscribe(res => {
            this.menuGroups = res.datas.groups;
            this.mainMenus = res.datas.mains;
            this.childMenus = res.datas.children;
            if (this.activeGroup) {
                this.activeMainMenus = this.mainMenus.filter(menu => menu.menuGroupId === this.activeGroup.id);
            }
            if (this.activeMenu) {
                this.activeChildMenus = this.childMenus.filter(menu => menu.menuParentId === this.activeMenu.id);
            }
        });
    }

    /**
     * 显示主菜单
     * @param {MenuGroup} menuGroup 主菜单的上级分组
     */
    showMainMenus(menuGroup: MenuGroup) {
        this.tsTabs.changeTab('主菜单');
        this.activeGroup = menuGroup;
        this.activeMainMenus = this.mainMenus.filter(menu => menu.menuGroupId === menuGroup.id);
    }

    /**
     * 显示子菜单
     * @param {Menu} mainMenu 子菜单的上级主菜单
     */
    showChildMenus(mainMenu: Menu) {
        this.tsTabs.changeTab('子菜单');
        this.activeMenu = mainMenu;
        this.activeChildMenus = this.childMenus.filter(menu => menu.menuParentId === mainMenu.id);
    }

    /**
     * 编辑菜单分组
     * @param {MenuGroup} menuGroup 要编辑的菜单组
     */
    editMenuGroup(menuGroup?: MenuGroup) {
        const modal = this.modal.create(MenuGroupModalComponent, { center: true });
        modal.instance.menuGroup = menuGroup || { id: 0, menuGroupName: '新菜单分组' };
        modal.open().subscribe(() => {
            this.loadDatas();
        });
    }

    /**
     * 编辑主要菜单
     * @param {MenuGroup} menuGroup 菜单组
     * @param {Menu} mainMenu 要编辑的主菜单
     */
    editMainMenu(menuGroup: MenuGroup, mainMenu?: Menu) {
        const modal = this.modal.create(MenuModalComponent, { center: true });
        modal.instance.menu = mainMenu || {
            id: 0,
            menuGroupId: menuGroup.id,
            menuParentId: 0,
            menuTitle: '新主菜单',
        };
        modal.open().subscribe(() => {
            this.loadDatas();
        });
    }

    /**
     * 编辑子菜单
     * @param {Menu} maniMenu 主菜单
     * @param {Menu} childMenu 要编辑的子菜单
     */
    editChildMenu(mainMenu: Menu, childMenu?: Menu) {
        const modal = this.modal.create(MenuModalComponent, { center: true });
        modal.instance.menu = childMenu || {
            id: 0,
            menuGroupId: mainMenu.menuGroupId,
            menuParentId: mainMenu.id,
            menuTitle: '新子菜单',
            permissionId: 0,
        };
        modal.open().subscribe(() => {
            this.loadDatas();
        });
    }

    /**
     * 删除菜单组
     * @param {MenuGroup} menuGroup 菜单组
     */
    deleteMenuGroup(menuGroup: MenuGroup) {
        this.confirm.danger('确认删除', `确认删除菜单组‘${menuGroup.menuGroupName}’,相关下级菜单也会被删除！`)
            .pipe(switchMap<void, ApiData>(() => this.menuService.deleteMenuGroup(menuGroup.id)))
            .subscribe(() => {
                this.toast.success('删除成功', `成功删除菜单组‘${menuGroup.menuGroupName}’！`);
                this.loadDatas();
            });
    }

    /**
     * 删除菜单
     * @param {Menu} 菜单
     */
    deleteMenu(menu: Menu) {
        this.confirm.danger('确认删除', `确认删除菜单‘${menu.menuTitle}’,相关子菜单也会被删除！`)
            .pipe(switchMap<void, ApiData>(() => this.menuService.deleteMenu(menu.id)))
            .subscribe(() => {
                this.toast.success('删除成功', `成功删除菜单‘${menu.menuTitle}’！`);
                this.loadDatas();
            });
    }

    /**
     * 确认菜单分组排序
     * @param {any} btn 加载按钮
     */
    confirmGroupSort(btn: any) {
        this.menuService.sortMenuGroup(this.menuGroups.map(item => item.id))
            .subscribe({
                next: res => this.toast.success('排序成功', `成功排序菜单组！`),
                complete: btn.dismiss(),
            });
    }

    /**
     * 确认排序菜单
     * @param {any} btn 按钮对象
     * @param {Menu[]} 参与排序菜单列表
     */
    confirmSort(btn: any, menus: Menu[]) {
        this.menuService.sortMenu(menus.map(item => item.id))
            .subscribe({
                next: res => this.toast.success('排序成功', `成功排序菜单！`),
                complete: btn.dismiss(),
            });
    }
}
