import { Component } from '@angular/core';
import { OffcanvasService } from 'ng-tui';
import { CanvasComponent } from './canvas';

@Component({
    templateUrl: './offcanvas.component.html',
})
export class OffcanvasComponent {
    constructor(private offcanvas: OffcanvasService) { }

    showCanvas(position: string): void {
        this.offcanvas.create(CanvasComponent, { title: position.toUpperCase(), position }).present();
    }
}