import { Injectable } from "@angular/core";
import { ComponentService, ComponentHandle } from 'projects/ng-tui/src/public_api';
import { LoginComponent } from '../view/login/login.component';
import { LoginConfig } from '../view/login/login.interface';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, USER_DATA } from '../interface/user.interface';

@Injectable()
export class DashbardService {

    private loginViewHandle: ComponentHandle;

    constructor(private cmpService: ComponentService) { }

    showLogin(loginConfig?: LoginConfig) {
        if (this.loginViewHandle) {
            this.loginViewHandle.present();
        } else {
            this.loginViewHandle = this.cmpService.create(LoginComponent);
            this.loginViewHandle.present();
            loginConfig && (this.loginViewHandle.instance.config = loginConfig);
        }
    }

    checkLoginStatus(): Observable<boolean> {
        return of(true).pipe(delay(1000));
    }

    /**
     * 保存当前登录状态
     * @param {User} userData 用户数据
     */
    saveLoginData(userData: User) {
        this.setObjectToStorage(USER_DATA, userData);
    }

    /**
     * 从本地存储中加载一个对象
     * @param {string} key 键名
     * @param {string} defaultValue 默认值
     * @return {T}
     */
    getObjectFromStorage<T>(key: string, defaultValue: T): T {
        const temp = localStorage.getItem(key);
        return temp === null ? defaultValue : JSON.parse(temp);
    }

    /**
     * 设置一个对象到本地存储
     * @param {string} key 键名
     * @param {object} object 对象
     * @return {void}
     */
    setObjectToStorage(key: string, object: { [key: string]: string | number | any }) {
        localStorage.setItem(key, JSON.stringify(object));
    }
}