import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskCheckboxComponent } from '@grafit/components';

@Component({
  selector: 'app-checkbox-binary',
  imports: [ItskCheckboxComponent, FormsModule],
  template: `
    <itsk-checkbox [(ngModel)]="agree" [binary]="true">Согласен с условиями</itsk-checkbox>
    <br />
    Value: {{ agree }}
    <br />
    <itsk-checkbox [(ngModel)]="answer" [binary]="true" trueValue="yes" falseValue="no">Свои значения модели</itsk-checkbox>
    <br />
    Value: {{ answer }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxBinaryComponent {
  protected agree = false;

  protected answer = 'no';
}
