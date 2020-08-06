export interface PermissionGroup {
    id: number;
    permissionGroupName: string;
}

export interface Permission {
    id: number;
    permissionName: string;
    permissionKey: string;
    permissionGroupId: number;
}

export interface PermissionGroupItem {
    permissionGroup: PermissionGroup;
    permissions: Permission[];
    open?: boolean;
}
