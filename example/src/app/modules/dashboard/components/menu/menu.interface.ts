export interface MenuItem {
    title: string;
    icon?: string;
    image?: string;
    url?: string;
    targetGroup?: MenuGroup;
    active?: boolean;
}

export interface MenuGroup {
    groupTitle: string;
    icon?: string;
    image?: string;
    menuItems: MenuItem[];
    targetModel: MenuModel;
    active: boolean;
}

export interface MenuModel {
    modelTitle: string;
    icon?: string;
    menuGroups: MenuGroup[];
    active: boolean;
}
