import { ComponentHandle } from './handle.class';

export class ViewHandle {

    constructor(private handle: ComponentHandle) { }

    autoPosition() {
        this.handle.dom.classList.add('');
    }
}
