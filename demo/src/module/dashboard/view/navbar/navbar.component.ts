import { AfterViewInit, Component } from '@angular/core';
import { OffcanvasService, ViewService } from 'ng-tui';
import { ToggleDirective } from 'ng-tui/tui-core/directive/toggle.directive';
import { MsgComponent } from './msg';
import { SideComponent } from './side';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements AfterViewInit {
  constructor(private offcanvas: OffcanvasService, private view: ViewService) { }

  showSideMenu(): void {
    this.offcanvas.create(SideComponent, { title: 'System Settings', position: 'end' }).present();
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
