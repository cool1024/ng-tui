export interface NodeItem {
    text: string;
    value?: any;
    children: NodeItem[];
}

export interface MenuItem {
    title?: string;
    route?: string;
    image?: string;
    icon?: string;
    children?: MenuItem[];
    active?: boolean;
    close?: boolean;
    value?: number;
}

export interface MenuTheme {
    splitLineColor?: string;
    defaultTextColor?: string;
    activeTextColor?: string;
    hoverBackgroundColor?: string;
}

export const defaultMenuTheme = {
    defaultTextColor: 'black',
    activeTextColor: 'blue',
    splitLineColor: 'white',
    hoverBackgroundColor: 'rgba(0, 0, 0, 0.04)'
};

export const createMenuTheme = (theme: MenuTheme): MenuTheme => {
    return Object.assign(defaultMenuTheme, theme);
}
