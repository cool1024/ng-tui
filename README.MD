# NG-TUI

基于 Bootstrap 实现的一套 Angular 组件库。

## 语言

1. [简体中文](README.MD)
2. [English](README_EN.MD)

## 特性

1. 图标库 [iconfont](http://www.iconfont.cn)。
2. 动画库 [animate.css](https://daneden.github.io/animate.css/) 。
3. 样式库 ·[Bootstrap v5.1.3](http://getbootstrap.com)。
4. 个性化主题。
5. 第三方组件库支持，地图，图表，代码高亮。

## 预览
![preview](preview.png)

## 安装

1. 安装 bootstrap
   `npm install bootstrap --save`

2. 安装 ng-tui
   `npm install ng-tui --save`

3. 如果你的是使用 angular cli 建的项目，你可以在 style.scss 文件中引入

```scss
// 导入bootstrap样式
@import "~bootstrap/scss/bootstrap";

// 导入ng-tui样式
@import "~ng-tui/scss/index";

// 导入iconfont样式
@import "//at.alicdn.com/t/font_799319_gi7b3dir7ct.css";

```

## 使用

导入`TUIModule`到项目的的 AppModule 中

```typescript
import { TUIModule } from 'ng-tui';

@NgModule({
    imports: [...,
        TUIModule.forRoot({
            // 你的配置参数
        })
        ...
    ],
    ...
})
```

## 相关说明
1. [可用组件列表](COMPONENT.MD)
