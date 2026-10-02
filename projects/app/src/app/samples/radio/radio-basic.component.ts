import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskRadioButtonComponent, ItskRadioComponent } from '@grafit/components';

@Component({
  selector: 'app-radio-basic',
  imports: [ItskRadioComponent, ItskRadioButtonComponent, FormsModule],
  template: `
    <itsk-radio [(ngModel)]="size">
      <itsk-radio-button value="s">Маленький</itsk-radio-button>
      <itsk-radio-button value="m">Средний</itsk-radio-button>
      <itsk-radio-button value="l">Большой</itsk-radio-button>
    </itsk-radio>
    Value: {{ size }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioBasicComponent {
  protected size = 'm';
}
