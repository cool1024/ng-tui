import { Component } from '@angular/core';

@Component({
    templateUrl: './code.component.html',
})
export class CodeComponent {

    html = `<ts-prism-code [code]="html"></ts-prism-code>`;
    typescript = `<ts-prism-code [code]="typescript_code" language="typescript"></ts-prism-code>`;
}
