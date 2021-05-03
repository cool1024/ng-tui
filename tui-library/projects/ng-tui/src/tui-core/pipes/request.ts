import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export const requestString = (url: string, headers?: { [key: string]: string }) => {
    const obj = new XMLHttpRequest();
    const obs = fromEvent(obj, 'loadend');
    obj.open('GET', url, true);
    if (headers) {
        for (const key in headers) {
            if (Object.prototype.hasOwnProperty.call(headers, key)) {
                obj.setRequestHeader(key, headers[key]);
            }
        }
    }
    obj.send();
    return obs.pipe(
        map<any, string>((_) => {
            return obj.responseText;
        })
    );
};

export const post = (url: string, param: { [key: string]: string | number | any }) => {
    const obj = new XMLHttpRequest();
    const obs = fromEvent(obj, 'loadend');
    obj.open('POST', url, true);
    obj.setRequestHeader('content-type', 'application/json');
    obj.send(JSON.stringify(param));
    return obs.pipe(
        map<any, any>((_) => {
            return obj.responseText;
        })
    );
};

export const requestObject = (url: string) => {
    return requestString(url).pipe(
        map<string, any>((str) => JSON.parse(str))
    );
};

export const paramToQueryString = (param: { [key: string]: string | number }) => {
    const paramArray = [];
    for (const key in param) {
        if (Object.prototype.hasOwnProperty.call(param, key)) {
            paramArray.push(`${key}=${param[key]}`);
        }
    }
    return paramArray.join('&');
};
