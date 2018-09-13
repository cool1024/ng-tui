# 按钮
按钮指令可以快速的构建一个`bootstrap`样式的按钮，并会自动给按钮加上`type="button"`属性,还有加载类型按钮

## 导入相关模块
在需要使用模态框页面所属模块导入ModalModule
```typescript
import { NgModule } from '@angular/core';
import { ButtonModule } from 'ng-tui';

@NgModule({
    imports: [
        // 导入按钮模块
        ButtonModule,
    ],
    declarations: [...],
    entryComponents: [...]
})
export class MyExampleModule { }
```

## 一个普通的按钮
```html
<button tsBtn>我是一个按钮</button>
```

## 设置颜色(默认是白色)
```html
<button tsBtn color="success">成功的颜色</button>
```

## 设置outline样式
```html
<button tsBtn outline color="success">成功的颜色</button>
```

## 设置尺寸
```html
<button tsBtn sm>小按钮</button>
<button tsBtn lg>大按钮</button>
```

## 加载按钮
```html
<button tsBtn loading (submit)="doSubmit($event)">提交表单</button>
```
```typescript
export class ExampleComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    doSubmit(btn: any) {

        // 3秒后关闭按钮
        timer(3000).subscribe(() => {
            btn.complete();
            // btn.dismiss();
        });
    }

}
```

