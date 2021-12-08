import { Injectable } from '@angular/core';
import { Subject, Observable, Observer, concat } from 'rxjs';

@Injectable()
export class ScriptService {
  public isReady!: boolean;
  public useScript!: Subject<void>;

  private task(src: string): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      // check repeat src
      const scripts = document.querySelectorAll('script');
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].getAttribute('src') === src) {
          if (scripts[i].getAttribute('complete') === 'complete') {
            observer.next();
            observer.complete();
          } else {
            scripts[i].addEventListener('load', () => {
              observer.next();
              observer.complete();
            });
          }
          return;
        }
      }

      // create new src
      const node: HTMLScriptElement = document.createElement('script');
      node.async = true;
      node.type = 'text/javascript';
      node.src = src;
      document.getElementsByTagName('head')[0].appendChild(node);
      node.addEventListener('load', () => {
        node.setAttribute('complete', 'complete');
        observer.next();
        observer.complete();
      });
    });
  }

  loads(srcs: string[] | string, test = false): Subject<void> {
    if (typeof srcs === 'string') {
      srcs = [srcs];
    }
    this.isReady = false;
    this.useScript = new Subject<void>();
    const taskArray = new Array<any>();
    if (test) {
      this.isReady = true;
      this.useScript.complete();
    } else {
      srcs.forEach((src) => {
        taskArray.push(this.task(src));
      });
      // tslint:disable-next-line: deprecation
      concat(...taskArray).subscribe({
        complete: () => {
          this.useScript.complete();
        },
      });
    }
    return this.useScript;
  }

  complete(func: () => void): void {
    // tslint:disable-next-line: deprecation
    this.useScript.subscribe({ complete: () => func() });
  }
}
