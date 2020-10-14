import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export const requestString = (url: string) => {
    const obj = new XMLHttpRequest();
    const obs = fromEvent(obj, 'loadend');
    obj.open('GET', url, true);
    obj.send();
    return obs.pipe(map<any, string>(_ => {
        return obj.responseText;
    }));
}

export const requestObject = (url: string) => {
    return requestString(url).pipe(map<string, any>(str => JSON.parse(str)));
}

export const paramToQueryString = (param: { [key: string]: string | number }) => {
    const paramArray = [];
    for (let key in param) {
        paramArray.push(`${key}=${param[key]}`);
    }
    return paramArray.join('&');
}