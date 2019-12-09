import { Injectable } from "@angular/core";
import { ComponentService } from 'projects/ng-tui/src/public_api';
import { LoginComponent } from './view/login/login.component';

@Injectable()
export class DashbardService {

    constructor(private cmpService: ComponentService) { }

    showLogin() {
        this.cmpService.create(LoginComponent);
    }
}