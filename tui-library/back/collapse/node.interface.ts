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
    hoverTextColor?: string;
    activeTextColor?: string;
    defaultBackgroundColor?: string;
    hoverBackgroundColor?: string;
    activeBackgroundColor?: string;
}

export const defaultMenuTheme = {
    defaultTextColor: 'black',
    hoverTextColor: 'blue',
    activeTextColor: 'blue',
    splitLineColor: 'white',
    defaultBackgroundColor: 'white',
    hoverBackgroundColor: 'black',
    activeBackgroundColor: 'gray',
};

export const createMenuTheme = (theme: MenuTheme): MenuTheme => {
    return Object.assign(defaultMenuTheme, theme);
}
