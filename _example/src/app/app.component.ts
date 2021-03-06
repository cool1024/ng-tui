import { Component, ViewChild } from '@angular/core';
import { Router, RouteConfigLoadStart, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { GlobalService, MenuService, AuthService, MessageService } from './cores/services';
import { MenuModel } from './modules/dashboard/components/menu/menu.interface';
import { AppConfig } from './configs/app.config';
import { ConfirmService, ToastService } from 'ng-tui';
import { HttpConfig } from './configs/http.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    // 主题内容DOM节点
    @ViewChild('viewContent') viewContent: HTMLDivElement;

    // 系统菜单列表
    menus = new Array<MenuModel>();

    // 菜单配置参数
    menuConfig = AppConfig.MENU_CONFIG;

    // 面包屑导航列表
    breadcrumbs = new Array<{ title: string, path?: string }>();

    constructor(
        public global: GlobalService,
        public menu: MenuService,
        private router: Router,
        private confirm: ConfirmService,
        public auth: AuthService,
        public message: MessageService,
        private toast: ToastService,
    ) {

        // 设置登入状态
        this.global.setValue('loginStatus', false);

        // 载入系统默认配置参数
        this.global.appendValuesToParams({
            dashboardMode: 'full',
            menuMode: this.global.getStringFromStorage('menuMode', 'full'),
            lazyload: true,
            color: 'info'
        });

        // 载入服务端参数

        // 1.菜单载入
        this.menu.loadMenu().subscribe(() => {
            // 2. 用信息载入
            this.auth.loadUserDeail();
        });

        // 从本地文件载入菜单
        // this.request.withoutHost.text('assets/json/menu.json').subscribe(res => {
        //      this.menu.loadMenu(JSON.parse(res));
        // });

        // 初始化消息服务
        this.message.initWs(HttpConfig.WEBSOCKET_URL, 'admin');
        this.message.initMs(HttpConfig.MESSAGE_URL, { token: '123456789' });

        this.message.obs.subscribe(msg => this.toast.info('收到一条新消息', msg));

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
                this.breadcrumbs = [];
                this.parseRoute(this.router.routerState.snapshot.root);
            }
        });
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
     * 退出登入
     */
    setOut() {
        this.confirm.warning('退出登入', '您确认要退出当前的账户吗？')
            .subscribe(() => this.auth.setOutAndClean());
    }

    /**
     * 路由数据解析
     * @param node 路由快照
     */
    parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data.breadcrumbs) {
            this.breadcrumbs = node.data.breadcrumbs;
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }

    /**
     * 清空消息通知
     */
    cleanMessage() {
        // this.toast.info('操作不可用', '这个清空操作为预览，无实际效果');
        this.message.cleanMsg();
    }

    /**
     * 发送通知消息
     */
    sendMessage() {
        this.message.sendMessage({ uid: 'admin', msg: '这是一条消息通知，发送时间为' + new Date() }).subscribe(res => {
            // this.toast.info('操作不可用', res);
        });
    }
}
