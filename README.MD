# NG-TUI

## LANGUAGE
1. [简体中文](README.MD)
2. [English](README-EN.MD)

## 说明
NG-TUI是ng-tools-ui的增强版本，移除了大部分无用功能，保留了原来的核心功能。组件名称没有太大的变化，当是可能移除或新增了属性。

## 特性
1. 移除了FontAwesome的依赖，改为使用[iconfont](http://www.iconfont.cn)。
2. 使用了[animate.css](https://daneden.github.io/animate.css/)  。
3. 使用了[bootstrap4.1](http://getbootstrap.com)。
4. 个性化主题。
5. 丰富的第三方组件库支持，地图，图表，代码高亮，富文本编辑器。

## 预览
![preview](preview/dashboard.png)

## 安装
1. 安装bootstrap(如果只使用css，不需要自定义主题可以不用安装)
`npm install bootstrap --save`
2. 安装ng-tui
`npm install ng-tui --save`
3. 如果你的是使用angular cli建的项目，你可以在style.css文件中引入
```css
/* 单纯使用css文件，不自定义主题 */
@import "~ng-tui/css/tui.css"
```
```scss
/* 使用scss,自定义主题 */
@import "~bootstrap/scss/functions";

/* 你的变量设置，覆盖默认值-前置 */

@import "~bootstrap/scss/variables";

/* 你的变量设置，覆盖默认值-后置 */

@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/root";
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/images";
@import "~bootstrap/scss/code";

@import "~bootstrap/scss/grid";
@import "~bootstrap/scss/tables";
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/buttons";

@import "~bootstrap/scss/transitions";
@import "~bootstrap/scss/dropdown";
@import "~bootstrap/scss/button-group";
@import "~bootstrap/scss/input-group";
@import "~bootstrap/scss/custom-forms";
@import "~bootstrap/scss/nav";
// @import "~bootstrap/scss/navbar";
@import "~bootstrap/scss/card";
// @import "~bootstrap/scss/breadcrumb";
// @import "~bootstrap/scss/pagination";
@import "~bootstrap/scss/badge";
// @import "~bootstrap/scss/jumbotron";
@import "~bootstrap/scss/alert";
@import "~bootstrap/scss/progress";
@import "~bootstrap/scss/media";
// @import "~bootstrap/scss/list-group";
@import "~bootstrap/scss/close";
@import "~bootstrap/scss/modal";
// @import "~bootstrap/scss/tooltip";
// @import "~bootstrap/scss/popover";
// @import "~bootstrap/scss/carousel";
@import "~bootstrap/scss/utilities";
@import "~bootstrap/scss/print"；

// tui拓展样式
@import "~ng-tui/css/tui"
```

4. 也可以在angular.json文件中引入
```json
...

"styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "../node_modules/ng-tui/css/tui.css",
        "styles.css"
      ],
...
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
export class MyModule { }
```


