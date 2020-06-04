import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[tsHover]'
})
export class TsHover {


    @HostListener('hover', ['$event'])
    @HostListener('blur', ['$event'])
    updateThem($event: any) {
        console.log($event);
    }
} 