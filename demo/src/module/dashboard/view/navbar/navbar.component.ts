import { AfterViewInit, Component } from '@angular/core';
import { OffcanvasService, ValueService, ViewService } from 'ng-tui';
import { ComponentHandle } from 'ng-tui/tui-core/component-creator/handle.class';
import { ToggleDirective } from 'ng-tui/tui-core/directive/toggle.directive';
import { DASHBOARD_CONFIG } from '../../dashboard.const';
import { MsgComponent } from './msg';
import { SideComponent } from './side';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements AfterViewInit {

  private msgView?: ComponentHandle;

  private fullMenu: boolean;

  constructor(
    private offcanvas: OffcanvasService,
    private view: ViewService,
    private vs: ValueService,
  ) {
    this.vs.valueChange(DASHBOARD_CONFIG.FULL_MENU).subscribe(res => console.log(res));
  }

  toggleMenuSize(): void {
    const value = this.vs.getValue(DASHBOARD_CONFIG.FULL_MENU, true) as boolean;
    this.vs.setValue(DASHBOARD_CONFIG.FULL_MENU, !value, true);
  }

  showSideMenu(): void {
    this.offcanvas
      .create(SideComponent, {
        title: SideComponent.title,
        position: SideComponent.position
      })
      .present();
  }

  showMsg(toggle: ToggleDirective): void {
    if (!this.msgView) {
      this.msgView = this.view.create(toggle, MsgComponent);
      // this.msgView.present();
    }
  }

  showFullScreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  ngAfterViewInit(): void {
    // this.showSideMenu();
  }
}
