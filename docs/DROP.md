# 下拉
下拉有集成下拉组件与下拉菜单指令，根据具体需求使用。

## 导入相关模块
```typescript
import { NgModule } from '@angular/core';
import { DropdownModule } from 'ng-tui';

@NgModule({
    imports: [
        DropdownModule,
    ],
    declarations: [...],
    entryComponents: [...]
})
export class MyExampleModule { }
```

## 一个集成的下拉
```html
<!-- value支持双向绑定，单独使用变更事件使用(valueChange)="myFunc($event)" -->
<ts-dropdown [items]="dropItems" [(value)]="dropdownValue" text="选择物品"></ts-dropdown>
```
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    ...
})
export class DropdownComponent{

    dropItems = [
        { text: 'Apple', value: 1 },
        { text: 'Board', value: 2 },
        { text: 'Card', value: 3 },
    ];

    dropdownValue = 1;

    constructor() { }
}

```

## 上方显示选项
```html
<ts-dropdown dropup [items]="dropItems" [(value)]="dropdownValue" text="选择物品"></ts-dropdown>
```

## 按钮属性支持 color,outline,sm,lg
```html
<ts-dropdown 
    outline
    lg
    color="success"
    [items]="dropItems" 
    [(value)]="dropdownValue" 
    text="选择物品">
</ts-dropdown>
```

## 自定义下拉菜单
```html
<!-- tsDropdown用于管理tsToggle与tsDropMenu -->
<div tsDropdown>
    <!-- tsToggle依附的元素用于触发显示/关闭菜,这个元素可以自定义，不一定要是按钮 -->
    <button tsToggle tsBtn class="dropdown-toggle">操作</button>
    <!-- tsDropMenu依附的元素是要显示的菜单面板，这个元素通常不要加样式 -->
    <div tsDropMenu>
        <button class="dropdown-item pointer">删除</button>
        <button class="dropdown-item pointer">下架</button>
        <button class="dropdown-item pointer">上架</button>
    </div>
</div>
```
## 自定义菜单支持上方显示菜单
```html
<div tsDropdown dropup>
    ...
</div>
```

## 自定义菜单支持自行修正菜单显示的位置
```html
<div tsDropdown>
    <button tsToggle tsBtn class="dropdown-toggle">操作</button>
    <!-- 支持水平与垂直方向上的位置修正 -->
    <div tsDropMenu [offsetX]="-57" [offsetY]="0">
        <button class="dropdown-item pointer">Item One</button>
        <button class="dropdown-item pointer">Item Two</button>
        <button class="dropdown-item pointer">Item Three</button>
    </div>
</div>
```