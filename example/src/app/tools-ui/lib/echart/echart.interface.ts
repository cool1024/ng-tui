export interface EchartsInstance {

    group: string | number;

    setOption(option: any, notMerge?: boolean, lazyUpdate?: boolean): void;
    setOption(option: any, opts?: { notMerge?: boolean, lazyUpdate?: boolean, silent?: boolean, }): void;
    getWidth(): number;
    getHeight(): number;
    getDom(): HTMLCanvasElement | HTMLDivElement;
    getOption(): any;
    resize(width?: number | string, height?: number | string, silent?: boolean): void;
    dispatchAction(payload: any): void;
    on(eventName: string, handler: Function, context?: any): void;
    off(eventName: string, handler?: Function): void;
    convertToPixel(
        finder: {
            seriesIndex?: number,
            seriesId?: string,
            seriesName?: string,
            geoIndex?: number,
            geoId?: string,
            geoName?: string,
            xAxisIndex?: number,
            xAxisId?: string,
            xAxisName?: string,
            yAxisIndex?: number,
            yAxisId?: string,
            yAxisName?: string,
            gridIndex?: number,
            gridId?: string
            gridName?: string
        },
        value: number[] | number
    ): number[] | number;
    convertFromPixel(
        finder: {
            seriesIndex?: number,
            seriesId?: string,
            seriesName?: string,
            geoIndex?: number,
            geoId?: string,
            geoName?: string,
            xAxisIndex?: number,
            xAxisId?: string,
            xAxisName?: string,
            yAxisIndex?: number,
            yAxisId?: string,
            yAxisName?: string,
            gridIndex?: number,
            gridId?: string
            gridName?: string
        },
        value: number[] | number
    ): number[] | number;
    containPixel(
        finder: {
            seriesIndex?: number,
            seriesId?: string,
            seriesName?: string,
            geoIndex?: number,
            geoId?: string,
            geoName?: string,
            xAxisIndex?: number,
            xAxisId?: string,
            xAxisName?: string,
            yAxisIndex?: number,
            yAxisId?: string,
            yAxisName?: string,
            gridIndex?: number,
            gridId?: string
            gridName?: string
        },
        value: number[]
    ): boolean;
    showLoading(type?: string, opts?: any): void;
    hideLoading(): void;
    getDataURL(opts: { type?: string, pixelRatio?: number, backgroundColor?: string, excludeComponents?: string[] }): string;
    getConnectedDataURL(opts: { type?: string, pixelRatio?: number, backgroundColor?: string, excludeComponents?: string[] }): string;
    appendData(opts: { seriesIndex?: string, data?: any, }): string;
    clear(): void;
    isDisposed(): boolean;
    dispose(): void;
}
