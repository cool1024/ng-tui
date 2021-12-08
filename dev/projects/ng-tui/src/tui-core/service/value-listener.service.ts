let instance: ValueChangeListenerService;
export class ValueChangeListenerService {
  private observes = new Array<any>();
  private interval: any;

  public getInstance(): ValueChangeListenerService {
    if (instance === undefined) {
      instance = new ValueChangeListenerService();
    }
    return instance;
  }

  private initInterval(): void {
    // tslint:disable-next-line: no-unused-expression
    this.interval ||
      (this.interval = setInterval(() => this.handlerFunc(), 500));
  }

  observe(dom: any, attrs: string[], handler: () => void): any {
    this.initInterval();
    const obs = {
      dom,
      attrs,
      handler,
      check: (e: any) => this.valueChange(e),
      values: new Array<any>(),
    };
    attrs.forEach((attr) => {
      const value = (dom as any)[attr];
      obs.values.push(value);
    });
    this.observes.push(obs);
    handler();
    return obs;
  }

  observeByCheck(checkFun: () => boolean, handler: () => void): any {
    this.initInterval();
    const obs = {
      handler,
      check: () => checkFun(),
    };
    handler();
    this.observes.push(obs);
    return obs;
  }

  observeClientRect(dom: HTMLElement, handler: () => void): any {
    this.initInterval();
    setTimeout(() => handler());
    const obs = {
      dom,
      handler,
      rect: dom.getBoundingClientRect(),
      check: (ob: any) => {
        const rt = ob.dom.getBoundingClientRect();
        const checkResult =
          rt.left !== ob.rect.left ||
          rt.top !== ob.rect.top ||
          rt.width !== ob.rect.width ||
          rt.height !== ob.rect.height;
        ob.rect = rt;
        return checkResult;
      },
    };
    this.observes.push(obs);
    return obs;
  }

  removeObs(obs: any): void {
    const i = this.observes.indexOf(obs);
    // tslint:disable-next-line: no-unused-expression
    i > -1 && this.observes.splice(i, 1);
  }

  valueChange(obs: any): boolean {
    const attrs: string[] = obs.attrs;
    return (
      attrs.findIndex((attr, index) => {
        return obs.dom[attr] !== obs.values[index];
      }) > -1
    );
  }

  handlerFunc(): void {
    this.observes.forEach((obs) => {
      try {
        if (obs.check(obs)) {
          obs.handler();
        }
      } catch (e) {
        console.log('interval run error');
        console.error(e);
      }
    });
  }
}
