# NG-TUI

## 语言
1. [简体中文](README.MD)
<!-- 2. [English](README-EN.MD) -->

## 说明
NG-TUI是ng-tools-ui的增强版本，移除了大部分无用功能，保留了原来的核心功能。组件名称没有太大的变化，但可能移除或新增了属性。

## 特性
1. 移除了FontAwesome的依赖，改为使用[iconfont](http://www.iconfont.cn)。
2. 使用了[animate.css](https://daneden.github.io/animate.css/)  。
3. 使用了[bootstrap4.1.3](http://getbootstrap.com)。
4. 个性化主题。
5. 丰富的第三方组件库支持，地图，图表，代码高亮，富文本编辑器。

## 预览
![preview](preview/dashboard.png)
[在线查看](https://www.cool1024.com)

## 安装
1. 安装bootstrap
`npm install bootstrap --save`

2. 安装ng-tui
`npm install ng-tui --save`

3. 如果你的是使用angular cli建的项目，你可以在style.scss文件中引入
```scss
// 导入bootstrap样式
@import "~bootstrap/scss/bootstrap";

// 导入tui样式-暂不可用，参考dashboard的引入方式
// @import "~ng-tui/scss/style"
```

## 使用
导入`TUIModule`到项目的的AppModule中
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
export class AppModule { }
```


