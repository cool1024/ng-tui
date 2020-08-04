import { Component, OnInit } from '@angular/core';
import { RoleGroup, Role } from '../../interfaces/role.interface';
import { ModalService, ConfirmService } from 'ng-tui';
import { RoleModalComponent } from './role-modal.component';
import { RoleService } from '../../services/role.service';
import { switchMap } from 'rxjs/operators';
import { ApiData } from '../../../../cores/classes';

@Component({
    selector: 'app-role-manager',
    templateUrl: './role-manager.component.html',
    styleUrls: ['./role-manager.component.scss']
})
export class RoleManagerComponent implements OnInit {

    roleGroups = new Array<RoleGroup>();
    roleTreeNode = {
        role: null,
        roleChildren: [],
        parentGroup: null,
    };

    activeRoleGroup: RoleGroup;

    constructor(
        private modal: ModalService,
        private confirm: ConfirmService,
        private roleService: RoleService,
    ) { }

    ngOnInit() {
        this.loadDatas();
    }

    loadDatas() {
        this.roleService.getRoleGroups(this.roleTreeNode)
            .subscribe(roleGroups => this.roleTreeNode.roleChildren = roleGroups);
    }

    showEditModal(roleGroup: RoleGroup) {
        const modal = this.modal.create(RoleModalComponent, { size: 'lg' });
        modal.instance.parentRole = roleGroup.parentGroup.role || {
            id: 0,
            roleName: '无上级角色',
        };
        modal.instance.role = Object.assign({}, roleGroup.role);
        modal.open().subscribe((role: Role) => {
            roleGroup.role = role;
        });
    }

    showAddModal(parentGroup: RoleGroup) {
        const modal = this.modal.create(RoleModalComponent, { size: 'lg' });
        modal.instance.parentRole = parentGroup.role || {
            id: 0,
            roleName: '无上级角色',
        };
        modal.instance.role = {
            id: 0,
            roleParentId: modal.instance.parentRole.id,
            roleName: '新增角色',
            permissionIds: [],
        };

        modal.open().subscribe((role: Role) => {
            const roleGroup: RoleGroup = {
                role: role,
                roleChildren: [],
                parentGroup: parentGroup,
            };
            parentGroup.roleChildren.push(roleGroup);
        });
    }

    confirmDelete(roleGroup: RoleGroup) {
        if (roleGroup.roleChildren.length > 0) {
            this.confirm.warning('拒绝操作', '此角色含有下级角色，不能直接删除！');
        } else {
            this.confirm.danger('确认删除', `确认删除角色‘${roleGroup.role.roleName}’`)
                .pipe(switchMap<void, ApiData>(() => this.roleService.deleteRole(roleGroup.role.id)))
                .subscribe(() => {
                    const index = roleGroup.parentGroup.roleChildren.indexOf(roleGroup);
                    roleGroup.parentGroup.roleChildren.splice(index, 1);
                });
        }
    }
}
