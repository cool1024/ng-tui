# NG-TUI

## Notes
This project was suspended for a long time, all related interfaces and examples are unavailable

## Language
1. [简体中文](README.MD)
2. [English](README_EN.MD)

## Description
NG_TUI is based with boostrap UI, for angular10+ project。

## Feature
1. Support Iconfont [iconfont](http://www.iconfont.cn)
2. Used [animate.css](https://daneden.github.io/animate.css/)
3. Used [Bootstrap v5.1.3](http://getbootstrap.com)
4. Theme DIY support。
5. Third part library support, map, chart, and prims ect.

## Preview
![preview](preview.png)
<!-- [在线查看](https://www.cool1024.com) 账号 admin 密码 123456789 -->

## Install
1. install bootstrap
`npm install bootstrap --save`

2. install ng-tui
`npm install ng-tui --save`

3. import style file into style.scss
```scss
// import boostrap style
@import "~bootstrap/scss/bootstrap";

// import ng-tui style
@import "~ng-tui/scss/index";

// import iconfont style
@import "//at.alicdn.com/t/font_799319_gi7b3dir7ct.css";
```

## Usage
Import `TUIModule` into `AppModule`
```typescript
import { TUIModule } from 'ng-tui';

@NgModule({
    imports: [..., 
        TUIModule.forRoot({
            // you config...
        })
        ...
    ],
    ...
})
```

## Info
1. [Component list](COMPONENT_EN.MD)

