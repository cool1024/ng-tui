import { Component } from '@angular/core';

@Component({
    templateUrl: './code.component.html',
})
export class CodeComponent {
    html = `<ts-prism [code]="html"></ts-prism>`;
    typescript = `<ts-prism [code]="typescript_code" language="typescript"></ts-prism>`;
}
