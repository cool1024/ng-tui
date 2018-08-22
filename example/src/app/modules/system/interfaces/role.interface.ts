export interface Role {
    id: number;
    roleParentId: number;
    roleName: string;
    permissionIds: number[];
}

export interface RoleGroup {
    role: Role;
    roleChildren: RoleGroup[];
    parentGroup?: RoleGroup;
}
