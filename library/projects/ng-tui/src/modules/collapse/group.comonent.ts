import { Component, Input } from "@angular/core";
import { MenuItem } from './node.interface';

@Component({
    selector: 'ts-group',
    templateUrl: './group.html'
})
export class GroupComponent {

    @Input() node: MenuItem
}