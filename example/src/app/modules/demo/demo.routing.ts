/**
 * 第三方示例模块路由
 *
 * @author xiaojian
 * @file   demo.routing.ts
 * @date   2018-8-19 17:11:38
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipsComponent } from './pages/tooltips/tooltips.component';
import { ToastComponent } from './pages/toast/toast.component';
import { PaginationComponent } from './pages/pagination/pagination.component';
import { ButtonComponent } from './pages/button/button.component';
import { CheckboxComponent } from './pages/checkbox/checkbox.component';
import { DropdownComponent } from './pages/dropdown/dropdown.component';
import { SelectComponent } from './pages/select/select.component';
import { TabComponent } from './pages/tab/tab.component';
import { SearchComponent } from './pages/search/search.component';
import { CollapseComponent } from './pages/collapse/collapse.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { BadgeComponent } from './pages/badge/badge.component';
import { ImageComponent } from './pages/image/image.component';
import { IconfontComponent } from './pages/iconfont/iconfont.component';
import { ModalComponent } from './pages/modal/modal.component';
import { ModalSimpleComponent } from './pages/modal/modal-simple.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { RequestComponent } from './pages/request/request.component';
import { CodeComponent } from '../../tools-ui/modules/code/code.component';
import { MapComponent } from './pages/map/map.component';
import { EditComponent } from './pages/edit/edit.component';
import { EchartComponent } from './pages/echart/echart.component';
import { DatepickerComponent } from './pages/datepicker/datepicker.component';
import { SimpleComponent } from './pages/upload/simple.component';
import { ViewComponent } from './pages/upload/view.component';
import { TableComponent } from './pages/table/table.component';
import { BadgeSelectComponent } from './pages/badge/badge-select.component';
import { SimpleWindowComponent } from './pages/modal/simple-window.component';
import { OfficeViewComponent } from './pages/modal/office-view/office-view.component';
import { FlexComponent } from './pages/flex/flex.component';

const routes: Routes = [
    {
        path: 'tooltips', component: TooltipsComponent,
        data: {
            breadcrumbs: [{ title: '提示消息' }]
        }
    },
    {
        path: 'toast', component: ToastComponent,
        data: {
            breadcrumbs: [{ title: '通知消息' }]
        }
    },
    {
        path: 'pagination', component: PaginationComponent,
        data: {
            breadcrumbs: [{ title: '分页组件' }]
        }
    },
    {
        path: 'button', component: ButtonComponent,
        data: {
            breadcrumbs: [{ title: '按钮' }]
        }
    },
    {
        path: 'checkbox', component: CheckboxComponent,
        data: {
            breadcrumbs: [{ title: '选项' }]
        }
    },
    {
        path: 'search', component: SearchComponent,
        data: {
            breadcrumbs: [{ title: '下拉搜索' }]
        }
    },
    {
        path: 'dropdown', component: DropdownComponent,
        data: {
            breadcrumbs: [{ title: '下拉菜单' }]
        }
    },
    {
        path: 'select', component: SelectComponent,
        data: {
            breadcrumbs: [{ title: '下拉选择' }]
        }
    },
    {
        path: 'tab', component: TabComponent,
        data: {
            breadcrumbs: [{ title: '面板切换' }]
        }
    },
    {
        path: 'collapse', component: CollapseComponent,
        data: {
            breadcrumbs: [{ title: '折叠面板' }]
        }
    },
    {
        path: 'progress', component: ProgressComponent,
        data: {
            breadcrumbs: [{ title: '进度条' }]
        }
    },
    {
        path: 'loading', component: LoadingComponent,
        data: {
            breadcrumbs: [{ title: '加载动画' }]
        }
    },
    {
        path: 'badge', component: BadgeComponent,
        data: {
            breadcrumbs: [{ title: '标签' }]
        }
    },
    {
        path: 'image', component: ImageComponent,
        data: {
            breadcrumbs: [{ title: '图片' }]
        }
    },
    {
        path: 'icon', component: IconfontComponent,
        data: {
            breadcrumbs: [{ title: '图标' }]
        }
    },
    {
        path: 'modal', component: ModalComponent,
        data: {
            breadcrumbs: [{ title: '弹窗' }]
        }
    },
    {
        path: 'confirm', component: ConfirmComponent,
        data: {
            breadcrumbs: [{ title: '操作确认' }]
        }
    },
    {
        path: 'request', component: RequestComponent,
        data: {
            breadcrumbs: [{ title: '发送请求' }]
        }
    },
    {
        path: 'code', component: CodeComponent,
        data: {
            breadcrumbs: [{ title: '代码高亮' }]
        }
    },
    {
        path: 'map', component: MapComponent,
        data: {
            breadcrumbs: [{ title: '高德地图' }]
        }
    },
    {
        path: 'ckedit', component: EditComponent,
        data: {
            breadcrumbs: [{ title: '富文本' }]
        }
    },
    {
        path: 'echart', component: EchartComponent,
        data: {
            breadcrumbs: [{ title: '百度图表' }]
        }
    },
    {
        path: 'datepicker', component: DatepickerComponent,
        data: {
            breadcrumbs: [{ title: '日期选择' }]
        }
    },
    {
        path: 'upload', component: SimpleComponent,
        data: {
            breadcrumbs: [{ title: '图片上传' }]
        }
    },
    {
        path: 'table', component: TableComponent,
        data: {
            breadcrumbs: [{ title: '标准表格' }]
        }
    },
    {
        path: 'flex', component: FlexComponent,
        data: {
            breadcrumbs: [{ title: 'Flex布局' }]
        }
    }
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    TooltipsComponent,
    ToastComponent,
    PaginationComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownComponent,
    SelectComponent,
    TabComponent,
    SearchComponent,
    CollapseComponent,
    ProgressComponent,
    LoadingComponent,
    BadgeComponent,
    BadgeSelectComponent,
    ImageComponent,
    IconfontComponent,
    ModalComponent,
    ModalSimpleComponent,
    SimpleWindowComponent,
    OfficeViewComponent,
    ConfirmComponent,
    RequestComponent,
    CodeComponent,
    MapComponent,
    EditComponent,
    EchartComponent,
    DatepickerComponent,
    SimpleComponent,
    ViewComponent,
    TableComponent,
    FlexComponent,
];

/**
 * 动态组件（模态框，窗口）
 */
export const entryComponents = [
    ModalSimpleComponent,
    ViewComponent,
    SimpleWindowComponent,
    OfficeViewComponent,
];

/**
 * 服务列表
 */
export const providers = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
