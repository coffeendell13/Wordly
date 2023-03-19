import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-virtual-keyboard',
    templateUrl: './virtual-keyboard.component.html',
    styleUrls: ['./virtual-keyboard.component.scss'],
})
export class VirtualKeyboardComponent implements OnInit {
    @Output() onChange = new EventEmitter();

    public keyboard: string[][] = [];

    constructor() {
        for (let i = 0; i < 32; i++) {
            let y = Math.floor(i / 8);
            let x = i % 8;
            if (!this.keyboard[y]) this.keyboard[y] = [];
            this.keyboard[y][x] = String.fromCharCode(i + 1072);
        }
    }
    ngOnInit(): void {}
    onClickByKey(key: string) {
        this.onChange.emit(key);
    }
}
