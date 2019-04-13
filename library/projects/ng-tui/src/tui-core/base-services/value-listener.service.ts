export class ValueChangeListenerService {

    private static instance: ValueChangeListenerService;
    private observes = new Array<any>();
    private interval: any;

    public static getInstance() {
        if (ValueChangeListenerService.instance === undefined) {
            ValueChangeListenerService.instance = new ValueChangeListenerService();
        }
        return ValueChangeListenerService.instance;
    }

    observe(dom: Object, attrs: string[], handler: Function) {
        // tslint:disable-next-line:no-unused-expression
        this.interval || (this.interval = setInterval(() => this.handlerFunc(), 200));
        const obs = { dom, attrs, handler, check: (e) => this.valueChange(e), values: [] };
        attrs.forEach(attr => obs.values.push(dom[attr]));
        this.observes.push(obs);
        handler();
        return obs;
    }

    observeClientRect(dom: HTMLElement, handler: Function) {
        // tslint:disable-next-line:no-unused-expression
        this.interval || (this.interval = setInterval(() => this.handlerFunc(), 200));
        const obs = {
            dom, handler,
            rect: dom.getBoundingClientRect(),
            check: (ob: any) => {
                const rt = ob.dom.getBoundingClientRect();
                const checkResult = (rt.left !== ob.rect.left)
                    || (rt.top !== ob.rect.top)
                    || (rt.width !== ob.rect.width)
                    || (rt.height !== ob.rect.height);
                ob.rect = rt;
                return checkResult;
            }
        };

        this.observes.push(obs);
        handler();
        return obs;
    }

    removeObs(obs: any) {
        const i = this.observes.indexOf(obs);
        // tslint:disable-next-line:no-unused-expression
        i > -1 && this.observes.splice(i, 1);
    }

    valueChange(obs: any) {
        const attrs: string[] = obs.attrs;
        return attrs.findIndex((attr, index) => {
            return obs.dom[attr] !== obs.values[index];
        }) > -1;
    }

    handlerFunc() {
        this.observes.forEach(obs => {
            try {
                // tslint:disable-next-line: no-unused-expression
                obs.check(obs) && obs.handler();
            } catch (e) {
                console.log('interval run error');
                console.error(e);
            }
        });
    }
}