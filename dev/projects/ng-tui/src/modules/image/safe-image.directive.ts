import {
  Directive,
  Input,
  HostBinding,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Directive({
  selector: 'img[tsBase64]',
})
export class SafeImageDirective implements OnChanges {
  @Input() tsBase64?: string;

  @HostBinding('src') src!: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tsBase64) {
      this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.tsBase64
      );
    }
  }
}
