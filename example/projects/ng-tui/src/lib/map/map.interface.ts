export interface LngLat {
    offset(lng: number, lat: number): LngLat;
    distance(lnglat: LngLat | LngLat[]): number;
    getLng(): number;
    getLat(): number;
    equals(lnglat: LngLat): boolean;
    toString(): string;
}
export interface Pixel {
    getX(): number;
    getY(): number;
    equals(point: Pixel): boolean;
    toString(): string;
}
export interface MapEvent {
    lnglat: LngLat;
    pixel: Pixel;
    type: string;
    target: any;
}
export interface Size {
    getWidth(): number;
    getHeight(): number;
    toString(): string;
}
export interface Bounds {
    contains(point: LngLat): boolean;
    getCenter(): LngLat;
    getSouthWest(): LngLat;
    getNorthEast(): LngLat;
    equals(lnglat: LngLat): boolean;
    toString(): string;
}
export interface GeometryUtil {
    distance(p1: LngLat, p2: LngLat): number;
    ringArea(ring: LngLat[]): number;
    isClockwise(ring: LngLat[]): boolean;
    distanceOfLine(ring: LngLat[]): number;
    ringRingClip(ring1: LngLat[], ring2: LngLat[]): number;
    doesRingRingIntersect(ring1: LngLat[], ring2: LngLat[]): boolean;
    doesLineRingIntersect(line: LngLat[], ring: LngLat[]): boolean;
    doesLineLineIntersect(line1: LngLat[], line2: LngLat[]): boolean;
    doesSegmentPolygonIntersect(p1: LngLat, p2: LngLat, rings: LngLat[][]): boolean;
    doesSegmentRingIntersect(p1: LngLat, p2: LngLat, ring: LngLat[]): boolean;
    doesSegmentLineIntersect(p1: LngLat, p2: LngLat, line: LngLat[]): boolean;
    doesSegmentsIntersect(p1: LngLat, p2: LngLat, p3: LngLat, p4: LngLat): boolean;
    isPointInRing(p: LngLat, ring: LngLat[]): boolean;
    isRingInRing(ring1: LngLat[], ring2: LngLat[]): boolean;
    isPointInPolygon(p: LngLat, rings: LngLat[][]): boolean;
    makesureClockwise(ring: LngLat[]): boolean;
    makesureAntiClockwise(ring: LngLat[]): boolean;
    closestOnSegment(p1: LngLat, p2: LngLat, p3: LngLat): LngLat;
    closestOnLine(p: LngLat, line: LngLat[]): LngLat;
    distanceToSegment(p1: LngLat, p2: LngLat, p3: LngLat): number;
    distanceToLine(p: LngLat, line: LngLat[]): number;
    isPointOnSegment(p1: LngLat, p2: LngLat, p3: LngLat, tolerance: number): boolean;
    isPointOnLine(p: LngLat, line: LngLat[], tolerance: number): boolean;
    isPointOnRing(p: LngLat, ring: LngLat[], tolerance: number): boolean;
    isPointOnPolygon(p: LngLat, rings: LngLat[][], tolerance: number): boolean;
}

export interface Geocoder {
    getLocation(address: String, callback: (status: String, result: any) => void): void;
    getAddress(location: LngLat | [number, number], callback: (status: String, result: any) => void): void;
    setCity(city: String): void;
}
