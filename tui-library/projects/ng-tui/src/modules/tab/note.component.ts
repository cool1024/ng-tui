import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ConfigService } from '../../tui-core/service/config.service';
import { MenuItem } from '../collapse/node.interface';

@Component({
    selector: 'ts-notes',
    templateUrl: './note.html',
})
export class NoteComponent extends ThemeDirective {
    @Input() notes: MenuItem[] = [];

    @Output() noteClick = new EventEmitter<MenuItem>();

    constructor(configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
    }

    setActive(node: MenuItem): void {
        node.active = true;
        this.notes.forEach((e) => e !== node && (e.active = false));
        this.noteClick.emit(node);
    }

    closeNote(index: number): void {
        this.notes[index].active = false;
        this.notes.splice(index, 1);
        if (this.notes.length > 0 && !~this.notes.findIndex((note) => note.active)) {
            this.setActive(this.notes[this.notes.length - 1]);
        }
    }
}
