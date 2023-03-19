import { Component, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild('titleModal', { static: true }) titleModal: ModalComponent;
    @Output()
    title = 'five';
    field: { key: string; state: LetterState }[][] = [];
    trigger = new FiveTrigger();
    hiddenWord: string = 'книга';
    disabledKeys: Set<string> = new Set();
    enteredWord: string = '';
    coordinate = { i: 0, j: 0 };
    color = new Letter();
    key = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
        .split('')
        .map((value) => ({ value, active: false }));
    keyboard = [
        ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з'],
        ['и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р'],
        ['с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'],
        ['ъ', 'ы', 'ь', 'э', 'ю', 'я', '-', '.', ' '],
    ];

    constructor() {
        this.titleModal = new ModalComponent();
    }

    onStartGame() {
        for (let i = 0; i < 6; i++) {
            this.field[i] = [];
            for (let j = 0; j < 5; j++) {
                this.field[i][j] = { key: '', state: 'No' };
            }
        }
        this.trigger.next();
    }
    // введение слова
    onClickByKey(key: string) {
        if (this.field[this.coordinate.i][this.coordinate.j].key.length === 0) {
            this.field[this.coordinate.i][this.coordinate.j].key = key;
            this.coordinate.j++;
            this.enteredWord += key;
        }
    }
    // проверка введённого слова
    checkWord(word: string) {
        if (word === this.hiddenWord) this.titleModal.open('Вы выиграли');
        if (word.length! < 5)
            this.titleModal.open('Слово должно состоять из 5 букв');
        else {
            for (let i = 0; i < 5; i++) {
                const letter = this.enteredWord[i];
                const cell = this.field[this.coordinate.i][i];
                if (letter === this.hiddenWord[i]) cell.state = 'Yes';
                else if (this.hiddenWord.indexOf(letter) !== -1)
                    cell.state = 'WrongPlace';
                else cell.state = 'No';
                if (cell.state !== 'No') this.disabledKeys.add(cell.key);
            }
            this.enteredWord = '';
            this.coordinate.i++;
            this.coordinate.j = 0;
            if (this.coordinate.i === 6) this.titleModal.open('Вы проиграли');
        }
    }
}
class FiveTrigger {
    state: 'Start' | 'Finish' = 'Start';
    next() {
        if (this.state === 'Finish') this.state = 'Start';
        else if (this.state === 'Start') this.state = 'Finish';
    }
}
type LetterState = 'No' | 'Yes' | 'WrongPlace';
class Letter {
    state: LetterState = 'No';
}
