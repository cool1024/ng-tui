import { Directive, Output, EventEmitter, ElementRef, AfterViewInit, HostBinding } from '@angular/core';

@Directive({
    selector: `input[tsFile]`,
    exportAs: 'tsFile'
})
export class UploadDirective implements AfterViewInit {

    @Output() fileChange = new EventEmitter<File | File[]>();

    inputDom: HTMLInputElement;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        this.inputDom = this.elementRef.nativeElement;
        this.inputDom.style.display = 'none';
        this.inputDom.type = 'file';
        this.inputDom.addEventListener('change', () => {
            if (this.isMultiple()) {
                const files = new Array<File>();
                for (let i = 0; i < this.inputDom.files.length; i++) {
                    files.push(this.inputDom.files[i]);
                }
                this.fileChange.emit(files);
            } else {
                this.fileChange.emit(this.inputDom.files[0]);
            }
            this.inputDom.value = '';
        });
    }

    openFileDialog() {
        this.elementRef.nativeElement.click();
    }

    removeFile() {
        this.elementRef.nativeElement.value = '';
        this.fileChange.emit(null);
    }

    isMultiple(): boolean {
        return this.inputDom.multiple === true;
    }

}