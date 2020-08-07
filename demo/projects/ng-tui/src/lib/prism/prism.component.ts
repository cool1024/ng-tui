import { Component, OnChanges, Input, ViewChild, SimpleChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

declare const Prism: any;

@Component({
    selector: 'ts-prism',
    template: `<pre class="line-numbers {{'language-'+language}}"><code class="{{'language-'+language}}" #pad></code></pre>`
})
export class PrismComponent implements OnInit, OnChanges {

    @Input() language: string;
    @Input() codeObs: Observable<string>;
    @Input() code: string;
    @ViewChild('pad') codePad: any;

    constructor() {
        this.language = 'html';
    }

    ngOnInit() {
        if (this.codeObs) {
            this.codeObs.subscribe(code => {
                this.code = code;
                this.updateCodePad();
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.language && changes.code) {
            this.updateCodePad();
        }
    }

    updateCodePad() {
        const language = this.language || 'html';
        const code = <string>Prism.highlight(this.code || '', Prism.languages[language]);
        const lineLength = code.split('\n').length;
        let lineCode = '<span class="line-numbers-rows">';
        for (let i = 0; i < lineLength; i++) {
            lineCode += '<span></span>';
        }
        lineCode += '</span">';
        this.codePad && (this.codePad.nativeElement.innerHTML = `${code}${lineCode}`);
    }
}