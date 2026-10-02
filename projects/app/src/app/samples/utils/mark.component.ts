import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskMarkDirective, ItskPrependZeroPipe } from '@grafit/components';

@Component({
  selector: 'app-mark',
  imports: [ItskMarkDirective, ItskPrependZeroPipe, FormsModule],
  template: `
    <div style="width: 320px">
      <input class="input__field margin-b-2" placeholder="Что подсветить" [(ngModel)]="search" />
    </div>
    @for (well of wells; track well.id) {
      <div [itskMark]="search">{{ well.id | itskPrependZero: 4 }} — {{ well.name }}</div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkComponent {
  protected search = 'скважина 2';

  protected wells = [
    { id: 7, name: 'Скважина 7 Северная' },
    { id: 23, name: 'Скважина 23 Южная' },
    { id: 142, name: 'Скважина 142 Западная' },
  ];
}
