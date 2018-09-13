# 确认对话框
通常做一些危险操作的时候，都要给与用户一个确认对话框，说明这个操作会有什么后果，避免误操作。

## 导入相关模块
需要在根模块导入模块ConfirmModule，一般的项目已经导入了（**在其它任何模块中不需要导入了！**）
```typescript
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

// 需要使用ConfirmModule模块
import {ConfirmModule} from 'ng-tools-ui';

@NgModule({
    declarations: [AppComponent],
    imports: [
        ...
        ConfirmModule.forRoot({
             // 确认按钮显示的文字
             okTitle: '确认', 
             // 取消按钮显示的文字
             cancelTitle: '取消' 
        }),
        ...
        AppRoutingModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

```
## 使用ConfirmModule弹出对话框
在需要用到的页面组件中注入对话框确认服务，就可以使用了

```typescript
import { Component } from '@angular/core';
// 引入消息服务
import { ConfirmService } from 'ng-tools-ui';

@Component({
    templateUrl: './example.component.html',
})
export class ExampleComponent {

    constructor(
        // 注入消息服务
        private confirm: ConfirmService,
    ) { }

    confirmDelete(){
        this.confirm.danger('警告', '确定要删除这个吗，操作不可恢复')
                    .subscribe(() => {
                        // 用户选择了确认...
                    });
    }
}
```

## ConfirmService 参考

### 方法

1.**info**(title: string, message: string, options?: Object): `Observable<void>`;
> 信息对话框

参数 | 类型 | 详情
------------ | ------------- | ------------
title | string  | 对话框标题
message | string  | 对话框内容
options | Object  | 其它配置参数，不填采用全局配置

2.**warning**(title: string, message: string, options?: Object): `Observable<void>`;
> 警告对话框

参数 | 类型 | 详情
------------ | ------------- | ------------
title | string  | 对话框标题
message | string  | 对话框内容
options | Object  | 其它配置参数，不填采用全局配置

3.**danger**(title: string, message: string, options?: Object): `Observable<void>`;
> 危险对话框

参数 | 类型 | 详情
------------ | ------------- | ------------
title | string  | 对话框标题
message | string  | 对话框内容
options | Object  | 其它配置参数，不填采用全局配置

4.**success**(title: string, message: string, options?: Object): `Observable<void>`;
> 成功对话框

参数 | 类型 | 详情
------------ | ------------- | ------------
title | string  | 对话框标题
message | string  | 对话框内容
options | Object  | 其它配置参数，不填采用全局配置

## options 配置参数说明
属性 | 类型 | 详情
------------ | ------------- | ------------
okTitle | string  | 确认按钮标题
cancelTitle | string  | 取消按钮标题

