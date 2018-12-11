/**
 * 全局服务，提供了系统内部全局变量，存储方法
 * @file global.service.ts
 * @author xiaojian
 * @date 2018年06月12日
 */

import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

    params: any = {};

    /**
     * 从windows对象中获取一个对象
     * @param key 要获取的对象名称
     */
    getWindowObject(key: string): any {
        return window[key] || {};
    }

    /**
     * 获取一个值，如果不存在，那么给一个默认值
     * @param {string} key 参数名称
     * @param {any} 参数默认值
     * @return {any}
     */
    getValue(key: string, defaultValue: any): any {
        return this.params[key] || defaultValue;
    }

    /**
     * 设置一个值
     * @param key 参数名称
     * @param value 参数的值
     * @return {void}
     */
    setValue(key: string, value: any): void {
        this.params[key] = value;
    }

    /**
     * 批量覆盖params参数
     * @param {any} newParams 新参数
     * @return {void}
     */
    appendValuesToParams(newParams: any): void {
        this.params = Object.assign(this.params, newParams);
    }

    /**
     * 从本地存储中加载一个数字（只能是Number）
     * @param {string} key 键名
     * @param {number} defaultValue 默认值
     */
    getNumberFromStorage(key: string, defaultValue: number) {
        const temp = localStorage.getItem(key);
        return temp === null ? defaultValue : Number(temp);
    }

    /**
     * 从本地存储中加载一个字符串（只能是string）
     * @param {string} key 键名
     * @param {string} defaultValue 默认值
     * @return {string}
     */
    getStringFromStorage(key: string, defaultValue: string): string {
        return localStorage.getItem(key) || defaultValue;
    }

    /**
     * 从本地存储中加载一个对象（只能是Object）
     * @param {string} key 键名
     * @param {string} defaultValue 默认值
     * @return {Object}
     */
    getObjectFromStorage<T>(key: string, defaultValue: T): object {
        const temp = localStorage.getItem(key);
        return temp === null ? defaultValue : JSON.parse(temp);
    }

    /**
     * 设置一个对象到本地存储
     * @param {string} key 键名
     * @param {object} object 对象
     * @return {void}
     */
    setObjectToStorage(key: string, object: any): void {
        localStorage.setItem(key, JSON.stringify(object));
    }

    /**
     * 从本地存储中批量获取变量(只能是String)
     * @param {string[]} ...keys 变量名称
     * @return {{ [key: string]: string }}
     */
    getValuesFromStorage(...keys: string[]): { [key: string]: string } {
        const params: any = {};
        keys.forEach(key => {
            params[key] = this.getStringFromStorage(key, '');
        });
        return params;
    }

    /**
     * 批量设置本地存储
     * @param {{ [key: string]: any }} keyValues 批量参数
     * @return {void}
     */
    setValuesToStorage(keyValues: { [key: string]: string }): void {
        for (const key in keyValues) {
            if (keyValues.hasOwnProperty(key)) {
                localStorage.setItem(key, keyValues[key]);
            }
        }
    }

    /**
     * 批量校验本地存储中的变量，一个不存在就会校验失败
     * @param {string[]} ...keys 变量名称
     * @return {boolean}
     */
    checkValuesFromStorage(...keys: string[]): boolean {
        return keys.findIndex(key => {
            const value = localStorage.getItem(key);
            return value === null;
        }) < 0;
    }

    /**
     * 清空本地存储
     *
     * @return {void}
     */
    cleanAllStorage(): void {
        localStorage.clear();
    }
}
