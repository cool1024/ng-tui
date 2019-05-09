import { Injectable } from '@angular/core';
import { Breadcrumb } from '../intefaces';

@Injectable()
export class NavService {

    breadcrumbs: Array<Breadcrumb> = [];

    updateBreadcrumbs(breadcrumbs: Array<Breadcrumb>) {
        this.breadcrumbs = breadcrumbs;
    }

    cleanItem() {
        this.breadcrumbs = [];
    }

    addItem(item: Breadcrumb) {
        this.breadcrumbs.push(item);
    }
}
