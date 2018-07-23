import { Injectable } from '@angular/core';
import { Subject, Observable, Observer, concat } from 'rxjs';

declare const window: any;

@Injectable()
export class ScriptService {

    private src: string;

    private isReady: boolean;

    public useScript: Subject<void>;

    load(src: string, target?: any): Subject<void> {
        this.isReady = false;
        this.src = src;
        const body = document.querySelector('body');
        this.useScript = new Subject<void>();

        // filter loaded scripts (use script service loaed)
        const scripts = document.querySelectorAll('script');
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].getAttribute('src') === src) {
                if (scripts[i].getAttribute('complete') === 'complete') {
                    this.isReady = true;
                    this.useScript.complete();
                } else {
                    scripts[i].addEventListener('load', () => {
                        this.isReady = true;
                        this.useScript.complete();
                    });
                }
                return;
            }
        }

        // is loaded from other
        if (target) {
            this.isReady = true;
            this.useScript.complete();
        } else {
            const node: HTMLScriptElement = document.createElement('script');
            node.async = true;
            node.type = 'text/javascript';
            node.src = src;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
            node.addEventListener('load', () => {
                this.isReady = true;
                this.useScript.complete();
                node.setAttribute('complete', 'complete');
            });
        }
        return this.useScript;
    }

    private task(src: string): Observable<void> {
        return Observable.create((observer: Observer<void>) => {
            const node: HTMLScriptElement = document.createElement('script');
            node.async = true;
            node.type = 'text/javascript';
            node.src = src;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
            node.addEventListener('load', () => {
                observer.complete();
            });
        });
    }

    loads(srcs: string[], test = false) {
        this.isReady = false;
        this.useScript = new Subject<void>();
        const taskArray = new Array<any>();
        if (test) {
            this.isReady = true;
            this.useScript.complete();
        }
        srcs.forEach(src => {
            taskArray.push(this.task(src));
        });
        concat(...taskArray).subscribe({
            complete: () => { this.useScript.complete(); }
        });
        return this.useScript;
    }

    complete(func: () => void) {
        this.useScript.subscribe({ complete: () => func() });
    }
}
