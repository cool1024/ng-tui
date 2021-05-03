import { Injectable } from '@angular/core';
import { ComponentHandle } from './handle.class';

/**
 * 动态组件视图服务，只服务于动态组件和调用者
 */
@Injectable()
export class ComponentHandleService extends ComponentHandle { }
