/**
 * 说明文档
 *
 * @author cool1024
 * @file   app-docs.component.ts
 * @date   2019-1-4 15:16:59
 */
import { Component } from '@angular/core';
import { RequestService } from 'src/app/cores/services';

const LANGUAGE = {
    html: window['Prism'].languages.html,
    typescript: window['Prism'].languages.typescript,
    javascript: window['Prism'].languages.javascript,
    xml: window['Prism'].languages.xml,
    php: window['Prism'].languages.php,
};

@Component({
    templateUrl: './app-docs.component.html',
    styleUrls: ['./app-docs.component.scss']
})
export class AppDocsComponent {

    docs = '';

    constructor(private service: RequestService) {
        const marked = window['marked'];
        const renderer = new marked.Renderer();
        renderer.code = (code: string, language: string): string => {
            const _code = window['Prism'].highlight(code, LANGUAGE[language] || LANGUAGE.html);
            return `<pre class="bg-light p-3">${_code}</pre>`;
        };

        renderer.blockquote = (quote: string): string => {
            return `<blockquote class="markdown-blockquote">${quote}</blockquote>`;
        };

        renderer.table = (header: string, body: string): string => {
            return `<table class="table table-striped table-inverse table-bordered">
            <thead>${header}<thead><tbody>${body}<tbody></table>`;
        };
        this.service.withoutHost.text('assets/docs/app-storage.md').subscribe(res => {
            this.docs = marked(res, { renderer });
        });
    }
}
