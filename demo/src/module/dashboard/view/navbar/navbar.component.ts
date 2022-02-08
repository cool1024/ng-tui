import { AfterViewInit, Component } from '@angular/core';
import { OffcanvasService, ValueService, ViewService } from 'ng-tui';
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

  constructor(
    private offcanvas: OffcanvasService,
    private view: ViewService,
    private vs: ValueService,
  ) { }

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
    this.view.create(toggle, MsgComponent).present();
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
