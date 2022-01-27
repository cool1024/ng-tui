import { AfterViewInit, Component } from '@angular/core';
import { OffcanvasService } from 'ng-tui';
import { SideComponent } from './side';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements AfterViewInit {
  constructor(private offcanvas: OffcanvasService) { }

  showSideMenu(): void {
    this.offcanvas.create(SideComponent, { title: 'System Settings', position: 'end' }).present();
  }

  ngAfterViewInit(): void {
    // this.showSideMenu();
  }
}
