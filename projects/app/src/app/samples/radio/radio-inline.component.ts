import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskRadioButtonComponent, ItskRadioComponent } from '@grafit/components';

@Component({
  selector: 'app-radio-inline',
  imports: [ItskRadioComponent, ItskRadioButtonComponent, FormsModule],
  template: `
    <itsk-radio [(ngModel)]="period" [inline]="true" [disabled]="disabled">
      <itsk-radio-button [value]="1">День</itsk-radio-button>
      <itsk-radio-button [value]="7">Неделя</itsk-radio-button>
      <itsk-radio-button [value]="30">Месяц</itsk-radio-button>
    </itsk-radio>
    Value: {{ period }}
    <br />
    <button class="button_default" (click)="disabled = !disabled">{{ disabled ? 'Разблокировать' : 'Заблокировать' }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioInlineComponent {
  protected period = 7;

  protected disabled = false;
}
