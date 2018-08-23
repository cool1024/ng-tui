import { Directive, Input, ElementRef, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MapService } from './map.service';
import { DefaultConfig } from './default.config';
import { Observable, Subject } from 'rxjs';
import { MapEvent } from './map.interface';

@Directive({
    selector: 'div[tsMap]',
    exportAs: 'tsMap',
})
export class MapDirective implements AfterViewInit, OnDestroy {

    @Input() center: [number, number];
    @Input() zoom: number;
    @Input() options: any;

    @Output() positionChange = new EventEmitter<MapEvent>(false);

    amap: any;
    map: any;
    marker: any;
    handle: Observable<void>;
    sub: Subject<void>;
    status: boolean;

    get mapOptions(): { [key: string]: string | number | [number, number] } {
        const options = {
            zoom: this.zoom,
            center: this.center,
            mapStyle: this.options.mapStyle,
        };
        return options;
    }

    constructor(private elementRef: ElementRef, private mapService: MapService) {
        this.center = [116.39, 39.9];
        this.zoom = 10;
        this.options = DefaultConfig;
        this.status = false;
        this.sub = new Subject<void>();
        this.handle = this.sub.asObservable();
    }

    ngAfterViewInit() {
        this.mapService.doFuc(amap => {
            this.amap = amap;
            this.options.zoom = this.zoom;
            this.options.center = this.center;
            this.map = new amap.Map(this.elementRef.nativeElement, this.mapOptions);
            this.map.on('click', (event: MapEvent) => {
                this.positionChange.emit(event);
            });
            this.sub.next();
            this.sub.complete();
            this.status = true;
        });
    }

    ngOnDestroy() {
        if (this.map) {
            this.map.destroy();
        }
    }

    private doFunc(func: () => void) {
        if (this.status) {
            func();
        } else {
            this.handle.subscribe(func);
        }
    }

    setMarker(position: [number, number]) {
        this.doFunc(() => {
            const map = this.map;
            if (!this.marker) {
                this.marker = new this.amap.Marker({
                    position: position
                });
                this.marker.setMap(map);
            } else {
                this.marker.setPosition(position);
            }
            this.map.setCenter(position);
        });
    }

    setCenter(center: [number, number]) { this.doFunc(() => this.map.setCenter(center)); }

    setMapStyle(mapStyle: string) { this.doFunc(() => this.map.setMapStyle(mapStyle)); }

    setZoom(zoom: number) { this.doFunc(() => this.map.setZoom(zoom)); }
}
