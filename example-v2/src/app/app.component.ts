import { Component, ViewChild } from '@angular/core';
import { Router, RouteConfigLoadStart, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { GlobalService, AuthService, MenuService, NavService } from './cores/services';
import { AppConfig } from './configs/app.config';
import { ConfirmService } from 'ng-tui';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    // 主题内容DOM节点
    @ViewChild('viewContent') viewContent: HTMLDivElement;

    // 菜单配置参数
    menuConfig = AppConfig.MENU_CONFIG;

    constructor(
        public global: GlobalService,
        public nav: NavService,
        public auth: AuthService,
        public menu: MenuService,
        private router: Router,
        private confirm: ConfirmService,
    ) {

        // 设置登入状态
        this.global.setValue('loginState', false);

        // 载入系统默认配置参数
        this.global.appendValuesToParams({
            dashboardMode: 'full',
            menuMode: this.global.getStringFromStorage('menuMode', 'full'),
            lazyload: true,
            color: AppConfig.THEM_COLOR
        });

        // // 1.菜单载入
        // this.menu.loadMenu().subscribe(() => {
        //     // 2. 用信息载入
        //     this.auth.loadUserDeail();
        // });

        // 从本地文件载入菜单
        this.menu.loadLocalMenu();
        this.auth.loadUserDeail();

        // 设置路由监听事件
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart) {
                this.global.params.lazyload = true;
            } else if (event instanceof NavigationEnd) {
                // 关闭加载动画
                this.global.params.lazyload = false;
                // 滚动条归位 -- ng6现在默认重置滑块位置了（好像失效了）
                // tslint:disable-next-line:no-unused-expression
                this.viewContent && (this.viewContent.scrollTop = 0);
                // 路由导航信息加载
                this.nav.cleanItem();
                this.parseRoute(this.router.routerState.snapshot.root);
            }
        });
    }

    /**
    * 退出登录
    */
    setOut() {
        this.confirm.warning('退出登录', '您确认要退出当前的账户吗？')
            .subscribe(() => this.auth.setOutAndClean());
    }

    /**
     * 切换菜单模式（small/full）
     */
    changeMenuMode() {
        this.global.params.menuMode = this.global.params.menuMode === 'small' ? 'full' : 'small';
        this.global.setValuesToStorage({ menuMode: this.global.params.menuMode });
        // 修复菜单变化图表等监听resize事件不生效问题
        setTimeout(() => {
            const event = document.createEvent('Event');
            event.initEvent('resize', true, true);
            window.dispatchEvent(event);
        }, 500);
    }

    /**
     * 路由数据解析
     * @param node 路由快照
     */
    parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data.breadcrumbs) {
            this.nav.updateBreadcrumbs(node.data.breadcrumbs);
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }
}
