# 模态框
需要临时显示一些小信息，或者填写编辑一个简单表单的时候，可以使用模态框。
<br>
**注意，本模态框不支持一个页面显示两个（一个页面只能同时弹出一个模态框，要显示另一个必须关闭之前的）**

## 导入相关模块
在需要使用模态框页面所属模块导入ModalModule
```typescript
import { NgModule } from '@angular/core';
import { ModalModule } from 'ng-tools-ui';

@NgModule({
    imports: [
        // 导入模态框模块
        ModalModule,
    ],
    declarations: [...],
    entryComponents: [...]
})
export class MyExampleModule { }
```

## 编写一个模态框组件

```typescript
import { Component } from '@angular/core';
import { ModalService } from 'ng-tools-ui';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button (click)="modal.dismiss()" type="button" class="close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">{{content}}</div>
    <div class="modal-footer">
        <button (click)="modal.dismiss()" type="button" class="btn btn-secondary">
            Close
        </button>
    </div>`,
})
export class ExampleModalComponent {

    // 这个变量可以在创建模态框的时候被设置
    content: stirng;

    constructor(
        public modal: ModalService
    ) { }
}

```

## 把模态框组件添加到模块的声明数组和入口组件数组中
```typescript
import { NgModule } from '@angular/core';
import { ModalModule } from 'ng-tools-ui';
import { ExampleModalComponent } from './example-modal.component';

@NgModule({
    imports: [
        ModalModule,
    ],
    declarations: [
        // 加入到声明数组中
        ExampleModalComponent
    ],
    entryComponents: [
        // 加入到入口组件数组中
        ExampleModalComponent
    ]
})
```

## 在这个模块中的任意一个页面组件中使用ModalService服务显示一个模态框
在需要用到的页面组件中注入模态框服务，就可以使用了

```typescript
import { Component } from '@angular/core';
// 引入模态框服务
import { ModalService } from 'ng-tools-ui';
// 模态框组件
import { ExampleModalComponent } from './example-modal.component';

@Component({
    templateUrl: './example.component.html',
})
export class ExampleComponent {

    constructor(
        // 注入消息服务
        private modal: ModalService,
    ) { }

    showModal(){
        // 创建一个模态框
        const modal = this.modal.create(ExampleModalComponent);
        // 使用instance属性来获取模态框的实例，可以设置模态框组件的变量值
        modal.instance.content = `Message Content`;
        // 使用open方法显示模态框，注意赋值要在打开模态框之前
        modal.open().subscribe(res => {
            // 当modal.close()执行后，这里的代码会执行，而modal.dismiss()不会执行这里的代码
            // close方法可以携带参数，res为调用close方法是传递的参数
            console.log(res);
        });
    }
}
```

## ModalService 参考

### 方法

1.**create**(
        content: any, 
        options?: {
        size?: string;
        center?: boolean;
        scroll?: string;
}): ModalService;
> 创建一个新的模态框，并且会返回这个模态框的服务实例

参数 | 类型 | 详情
------------ | ------------- | ------------
content | any  | 模态框组件
options | object  | 配置参数

### options 配置参数说明
属性 | 类型 | 详情
------------ | ------------- | ------------
size | string  | 尺寸 'xl','lg','sm'三种，默认是中等大小介于'lg'和'sm'之间
center | boolean  | 是否在中心显示，默认false
scroll | string  | 滑块的位置 'in','out'两种选择，默认是'out'

2.**open**(): `Observable<any>`;
> 显示模态框，并返回一个可观察对象，用于触发关闭模态框的后续操作

参数 | 类型 | 详情
------------ | ------------- | ------------
content | any  | 模态框组件
options | object  | 配置参数

3.**close**(params?: any): void;
>关闭当前打开的模态框，并可以传递一个参数用与关闭后的后续操作

4.**dismiss**(): void;
>什么都不做，直接关闭当前显示的模态框

### 属性
instance `any`
>当前创建的模态框实例，用与设置修改模态框中的变量属性


