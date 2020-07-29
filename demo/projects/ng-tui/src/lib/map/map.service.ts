import { Injectable } from '@angular/core';
import { Observable, fromEventPattern, Subject, Observer } from 'rxjs';
import { GeometryUtil, Geocoder } from './map.interface';
import { ScriptService } from '../../tui-core/base-services/script.service';
import { MapConfig } from './map.config';
import { switchMap } from 'rxjs/operators';
declare const window: any;

@Injectable()
export class MapService {

    private loadHandle: Observable<any>;
    private ready = false;
    private amap: any;

    constructor(
        private mapConfig: MapConfig,
        private script: ScriptService,
    ) {
        const sub = new Subject<any>();
        this.loadHandle = sub.asObservable();
        if (!window.AMap) {
            window.aMapLoadCallBack = () => {
                this.amap = window.AMap;
                this.ready = true;
                sub.next(window.AMap);
                sub.complete();
            };
            this.script.load(`https://webapi.amap.com/maps?v=1.4.3&key=${this.mapConfig.appKey}&callback=aMapLoadCallBack`);
        } else {
            this.ready = true;
        }
    }

    doFuc(func: (amap: any) => void) {
        if (this.ready) {
            func(this.amap);
        } else {
            this.loadHandle.subscribe({ complete: () => func(this.amap) });
        }
    }

    getPositionByAddress(address: string): Observable<{ result: boolean, data: any }> {
        return this.doAMapGeocoder().pipe(
            switchMap<Geocoder, { result: boolean, data: any }>(geocoder => {
                return fromEventPattern<{ result: boolean, data: any }>((handle => {
                    geocoder.getLocation(address, (status: string, result: any) => {
                        if (status === 'complete' && result.info === 'OK') {
                            handle({ result: true, data: result });
                        } else {
                            handle({ result: false, data: result });
                        }
                    });
                }));
            })
        );
    }

    getAddressByPosition(point: [number, number]): Observable<{ result: boolean, data: any }> {
        return this.doAMapGeocoder().pipe(
            switchMap<Geocoder, { result: boolean, data: any }>(geocoder => {
                return fromEventPattern<{ result: boolean, data: any }>((handle => {
                    geocoder.getAddress(point, (status: string, result: any) => {
                        if (status === 'complete' && result.info === 'OK') {
                            handle({ result: true, data: result });
                        } else {
                            handle({ result: false, data: result });
                        }
                    });
                }));
            })
        );
    }

    doAMapGeocoder(options: any = {}): Observable<Geocoder> {
        return Observable.create((observer: Observer<Geocoder>) => {
            this.doFuc(() => {
                window.AMap.service('AMap.Geocoder', () => {
                    const geocoder = new window.AMap.Geocoder(options);
                    observer.next(geocoder);
                    observer.complete();
                });
            });
        });
    }

    geometryUtil(callback: (_: GeometryUtil, amap: any) => void): void {
        this.doFuc(amap => {
            callback(amap.GeometryUtil, amap);
        });
    }
}