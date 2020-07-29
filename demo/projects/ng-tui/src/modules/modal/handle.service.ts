import { Injectable } from '@angular/core';
import { ModalHandle } from './modal.handle';

/**
 * 动态组件视图服务，只服务于动态组件和调用者
 */
@Injectable()
export class ModalViewService extends ModalHandle { }
