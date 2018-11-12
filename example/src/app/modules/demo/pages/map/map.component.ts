import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MapService, MapStyles, MapEvent } from 'ng-tui';

@Component({
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @ViewChild('map') map: any;

    consoleLog: { [key: string]: any } = {
        message: '点击对应按钮，获取调用结果'
    };

    mapStatus = false;

    constructor(private mapService: MapService, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.mapService.doFuc((AMap) => {
            this.mapStatus = true;
            this.map.setMarker([116.480983, 40.0958]);
            this.changeDetectorRef.detectChanges();
            // 添加自动补全插件
            AMap.plugin('AMap.Autocomplete', () => {
                return new AMap.Autocomplete({ input: 'search_input' });
            });
        });
    }

    getAddressInfo(address: string) {
        this.mapService.getPositionByAddress(address).subscribe(res => {
            this.consoleLog = res;
            // 这里的数据无法实时更新到视图中，需要手动刷新视图
            this.changeDetectorRef.detectChanges();
        });
    }

    getPointInfo(point: [number, number] = [116.396574, 39.992706]) {
        this.mapService.getAddressByPosition(point).subscribe(res => {
            this.consoleLog = res;
            // 这里的数据无法实时更新到视图中，需要手动刷新视图
            this.changeDetectorRef.detectChanges();
        });
    }

    getMyLocationInfo() { }

    getPosition(event: MapEvent) {
        const point: [number, number] = [event.lnglat.getLng(), event.lnglat.getLat()];
        console.log(point);
        // 解析坐标地址，通过经纬度获取真实地址
        this.getPointInfo(point);
        this.map.setMarker(point);
    }

    getPointDistance(lng1: number, lat1: number, lng2: number, lat2: number) {
        return this.mapService.geometryUtil((gutil, amap) => {
            this.consoleLog = {
                point1: { lng1, lat1 },
                point2: { lng2, lat2 },
                distance: gutil.distance(new amap.LngLat(lng1, lat1), new amap.LngLat(lng2, lat2)),
            };
        });
    }

    randomStyle() {
        this.map.setMapStyle(MapStyles[new Date().getSeconds() % 10]);
    }

    randomCenter() {
        this.map.setMarker([116.480983 + Math.random(), 40.0958 + Math.random()]);
    }

}
