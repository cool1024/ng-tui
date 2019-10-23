export interface NodeItem {
    text: string;
    value?: any;
    children: NodeItem[];
}

export interface MenuItem {
    title: string;
    route?: string;
    image?: string;
    icon?: string;
    children: MenuItem[];
}