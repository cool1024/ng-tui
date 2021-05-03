export interface TUIComponent {

    // 用于显示组件的方法
    present(): void;

    // 用于隐藏组件-不是销毁组件
    dismiss(): void;

    // 用于销毁组件
    destroy(): void;
}

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}
