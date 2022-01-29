import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Directive({
    selector: '*[tsCkeditor]'
})
export class CkeditorDirective implements OnChanges, AfterViewInit, OnDestroy {

    @Input() content: string;

    @Input() config: any;

    @Output() contentChange = new EventEmitter<string>(false);

    private editor: any;

    constructor(private elf: ElementRef) { }

    updateContent(): void {
        this.editor && this.editor.setData(this.content || '');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateContent();
    }

    ngAfterViewInit(): void {
        const dom = this.elf.nativeElement as HTMLElement;
        ClassicEditor.create(dom, this.config || {})
            .then((editor: any) => {
                this.editor = editor;
                this.updateContent();
                editor.model.document.on('change:data', () => {
                    this.contentChange.emit(editor.getData());
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    ngOnDestroy(): void {
        this.editor && this.editor.destroy();
    }
}