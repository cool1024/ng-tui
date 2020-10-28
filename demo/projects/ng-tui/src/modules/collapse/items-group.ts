import { Component, Input } from "@angular/core";
import { MenuItem } from './node.interface';

@Component({
    selector: 'ts-items-group',
    templateUrl: './items-group.html'
})
export class ItemsGroupComponent {

    @Input() hoverStyle: { [key: string]: [string, string, string] } = {};
    @Input() nodes: MenuItem[];

}