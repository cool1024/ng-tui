import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Event, RouteConfigLoadStart, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';
import { map, filter, delay } from 'rxjs/operators';

@Injectable()
export class TUIService {

    public routeLoading = false;

    public get $routeLoading(): Observable<boolean> {
        return this.router.events.pipe(
            filter(e => e instanceof RouteConfigLoadStart || e instanceof NavigationEnd),
            map<Event, boolean>(e => e instanceof RouteConfigLoadStart)
        );
    };

    public get canBack() {
        return this.navCx > 0;
    }

    private navCx = 0;

    constructor(private router: Router) {
        this.$routeLoading.subscribe(e => {
            this.routeLoading = e;
        });
    }

    navBack() {
        if (this.canBack) {
            window.history.back();
            this.navCx--;
        }
    }

    navUrl(url: string) {
        this.navCx++;
        this.router.navigateByUrl(url);
    }

    toggleFullScreen() {
        if (document['fullscreenElement']) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

}