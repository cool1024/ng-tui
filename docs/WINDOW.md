# 窗口
窗口的使用和模态框很像，但是窗口可以同时打开多个，且窗口的大小，位置完全由窗口自身的模版决定的，类似一个新页面。
<br>
**注意，使用窗口要注意关闭窗口和窗口关闭时的垃圾回收操作**

## 导入相关模块
在需要使用模态框页面所属模块导入WindowModule
```typescript
import { NgModule } from '@angular/core';
import { WindowModule } from 'ng-tools-ui';

@NgModule({
    imports: [
        // 导入窗口模块
        WindowModule,
    ],
    declarations: [...],
    entryComponents: [...]
})
export class MyExampleModule { }
```

## 编写一个窗口组件

```typescript
import { Component, OnInit } from '@angular/core';
// 和模态框不同，窗口中使用独立的WindowViewService
import { WindowViewService } from 'ng-tools-ui';

@Component({
    template: `
    <div class="bg-light h-100">
        <nav class="navbar navbar-light bg-white source-view-header position-absolute w-100">
            <span class="navbar-brand">
                window
            </span>
            <div>
                <span (click)="view.close()" class="text-muted text-danger-hover pointer">
                    <i class="fa fa-times mr-2" aria-hidden="true"></i>关闭
                </span>
            </div>
        </nav>
        <div class="h-100">

            <!--窗口内容-->

        </div>
    </div>`
})
export class ExampleWindowComponent implements OnInit {

    // 和模态框不同，每个view服务都是独立的实例
    constructor(public view: WindowViewService) { }

    ngOnInit() {
        
    }
}


```

## 把窗口组件添加到模块的声明数组和入口组件数组中
```typescript
import { NgModule } from '@angular/core';
import { WindowModule } from 'ng-tools-ui';
import { ExampleWindowComponent } from './example-window.component';

@NgModule({
    imports: [
        WindowModule,
    ],
    declarations: [
        // 加入到声明数组中
        ExampleWindowComponent
    ],
    entryComponents: [
        // 加入到入口组件数组中
        ExampleWindowComponent
    ]
})
```

## 在这个模块中的任意一个页面组件中使用WindowService服务显示一个窗口
在需要用到的页面组件中注入模态框服务，就可以使用了

```typescript
import { Component } from '@angular/core';
// 引入窗口服务
import { WindowService } from 'ng-tools-ui';
// 模态框组件
import { ExampleWindowComponent } from './example-window.component';

@Component({
    templateUrl: './example.component.html',
})
export class ExampleComponent {

    constructor(
        // 注入窗口服务
        private window: WindowService,
    ) { }

    showWindow(){

        // 创建一个新窗口
        const window = this.window.push(ExampleWindowComponent);

        // 显示窗口
        window.present();
    }
}
```

## WindowService 参考

### 方法

1.**push**(content: any): WindowHandle;
> 创建一个新窗口，窗口会进入一个窗口列表中，位于最上层；方法会返回一个用操作窗口的handle

参数 | 类型 | 详情
------------ | ------------- | ------------
content | any  | 窗口组件

2.**pop**();
> 关闭最上面的窗口

## WindowHandle 参考

### 方法

1.**present**(): Observable<any> 
> 显示窗口，并返回一个可观察对象，每次执行send方法时都会接收到发送的参数

2.**close**(data:any): `void`;
> 主动关闭窗口，一般只会在窗口内部执行,close也会执行一次send方法

3.**send**(data:any): `void`;
> 主动发送一个参数，这个参数可以在present方法返回的可观察对象中接收到

### 属性
instance `any`
>当前创建的窗口实例，用与设置修改模态框中的变量属性


## WindowViewService 参考
> 这个服务提供了几个窗口交互方法，只能在窗口内部使用
#### 方法

1.**present**(): Observable<any> 
> 显示窗口，并返回一个可观察对象，每次执行send方法时都会接收到发送的参数

2.**close**(data:any): `void`;
> 主动关闭窗口，一般只会在窗口内部执行,close也会执行一次send方法

3.**send**(data:any): `void`;
> 主动发送一个参数，这个参数可以在present方法返回的可观察对象中接收到


