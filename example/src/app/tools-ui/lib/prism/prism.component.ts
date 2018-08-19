
import { Component, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';

declare const Prism: any;

@Component({
    selector: 'ts-prism',
    template: `<pre class="line-numbers {{'language-'+language}}"><code class="{{'language-'+language}}" #pad></code></pre>`
})
export class PrismComponent implements OnChanges {

    @Input() language: string;
    @Input() code: string;
    @Input() codeStyle: { [key: string]: string };
    @ViewChild('pad') codePad: any;

    private languages: any = {
        html: Prism.languages.html,
        typescript: Prism.languages.typescript,
        javascript: Prism.languages.javascript,
        xml: Prism.languages.xml,
        php: Prism.languages.php,
    };

    constructor() {
        this.language = 'html';
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.language && changes.code) {
            const language = this.language || 'html';
            const code = <string>Prism.highlight(this.code || '', this.languages[language]);
            const lineLength = code.split('\n').length;
            let lineCode = '<span class="line-numbers-rows">';
            for (let i = 0; i < lineLength; i++) {
                lineCode += '<span></span>';
            }
            lineCode += '</span">';
            this.codePad.nativeElement.innerHTML = `${code}${lineCode}`;
        }
    }
}
