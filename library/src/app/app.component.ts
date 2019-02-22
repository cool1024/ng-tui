import { Component } from '@angular/core';
import { WindowService, FileItem } from 'projects/ng-tui/src/public_api';
import { DrawComponent } from 'projects/ng-tui/src/modules/clip/draw.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private windowService: WindowService) { }

    fileSrc: FileItem = null;

    showDrawWindow() {
        const window = this.windowService.push(DrawComponent);
        window.instance.file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAAb0lEQVRYw+3ZywrAIAxE0Zni//9yuu4uVtSa3qzFA3mIohXKhhNr0rtd2hTA9WE/+tCTtaDGwAuijZ+67054agy8oat77x6dE/HHVHuhZsYJGBgYGBgYWFLjYf6te3XQ1cAlutqkGvhQ2PzCAJeDb3bCC4D8cH6kAAAAAElFTkSuQmCC';
        window.present().subscribe(res => {
            console.log(res);
        });
    }
}
