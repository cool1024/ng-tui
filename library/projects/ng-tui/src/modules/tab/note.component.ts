import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../collapse/node.interface';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-notes',
    templateUrl: './note.html'
})
export class NoteComponent extends BaseTheme {

    @Input() notes: MenuItem[] = [];

    @Output() noteClick = new EventEmitter<MenuItem>();

    constructor(configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
    }

    setActive(node: MenuItem) {
        node.active = true;
        this.notes.forEach(e => e !== node && (e.active = false));
        this.noteClick.emit(node);
    }

    closeNote(index: number) {
        this.notes[index].active = false;
        this.notes.splice(index, 1);
        if (this.notes.length > 0 && (!~this.notes.findIndex(note => note.active))) {
            this.setActive(this.notes[this.notes.length - 1]);
        }
    }
}
