# 多选与单选
分页组件通常用于列表（表格）数据展示。
> * 表单组件如果用于form表单中应该要一个name属性
* 支持ngModel,ngModelChange的双向绑定

## 导入相关模块
```typescript
import { NgModule } from '@angular/core';
import { CheckboxModule } from 'ng-tui';

@NgModule({
    imports: [
        CheckboxModule,
    ],
    declarations: [...],
    entryComponents: [...]
})
export class MyExampleModule { }
```

## 单选
```html
<ts-radio [value]="0" [(ngModel)]="gender">先生</ts-radio>
<ts-radio [value]="1" [(ngModel)]="gender">女士</ts-radio>
```
```typescript
import { Component } from '@angular/core';

@Component({
    ...
})
export class ExampleComponent {

    // 性别
    gender = 0;

    constructor() { }
}
```


## 多选
```html
<ts-checkbox [value]="0" [(ngModel)]="types">体育</ts-checkbox>
<ts-checkbox [value]="1" [(ngModel)]="types">影视</ts-checkbox>
<ts-checkbox [value]="2" [(ngModel)]="types">游戏</ts-checkbox>
<ts-checkbox [value]="3" [(ngModel)]="types">综艺</ts-checkbox>
```
```typescript
import { Component } from '@angular/core';

@Component({
    ...
})
export class ExampleComponent {

    // 类型列表
    types = [0,3];

    constructor() { }
}
```

## 颜色支持
```html
<ts-radio color="success">先生</ts-radio>
<ts-checkbox color="primary">体育</ts-checkbox>
```

## 禁用
```html
<ts-radio color="success" disabled="true">先生</ts-radio>
<ts-checkbox color="primary" disabled="true">体育</ts-checkbox>
```
## 非表单事件
事件名称|	事件类型|	说明
-------|---------|-------
checkedChange|	boolean|	每次选项状态改变时会触发，返回当前选中状态