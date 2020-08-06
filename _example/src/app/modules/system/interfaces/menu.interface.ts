export interface MenuGroup {
    id: number;
    menuGroupName: string;
    level?: number;
}

export interface Menu {
    id: number;
    menuTitle: string;
    menuKey: string;
    menuGroupId: number;
    menuParentId: number;
    menuIcon?: string;
    menuImage?: string;
    menuUrl?: string;
    permissionId?: number;
}