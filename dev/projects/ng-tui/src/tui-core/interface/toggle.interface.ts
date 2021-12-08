/**
 * Interface Toggle
 */

import { ToggleDirective } from '../directive/toggle.directive';

export interface Toggle {
  /**
   * 绑定时执行方法
   * 被tsToggle指令修饰的组件再视图初始化完毕后将会执行此方法
   *
   * @param toggle tsToggle的宿主
   */
  bind?: (toggle: ToggleDirective) => void;

  /**
   * 触发时执行方法
   * 被tsToggle指令修饰的组件满足触发条件时执行此方法
   *
   */
  toggle?: (toggle: ToggleDirective) => void;
}
