import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Event, RouteConfigLoadStart, NavigationEnd } from '@angular/router';
import { map, skipWhile, tap, delay } from 'rxjs/operators';

@Injectable()
export class TUIService {

    public routeLoading = false;

    public get $routeLoading(): Observable<boolean>{
        return this.router.events.pipe(
            skipWhile(e => !~[RouteConfigLoadStart, NavigationEnd].findIndex(t => e instanceof t)),
            map<Event, boolean>(e => e instanceof RouteConfigLoadStart)
        );
    };

    constructor(private router: Router) {
        this.$routeLoading.subscribe(e => {
            this.routeLoading = e
        });
    }

    toggleFullScreen() {
        if (document['fullscreenElement']) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

}