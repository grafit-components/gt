import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskToggleComponent } from '@grafit/components';

@Component({
  selector: 'app-toggle-appearance',
  imports: [ItskToggleComponent, FormsModule],
  template: `
    <itsk-toggle [(ngModel)]="leftLabel" [leftLabel]="true">Подпись слева</itsk-toggle>
    <br />
    <itsk-toggle [(ngModel)]="colored" trueColor="#2e9e5b" falseColor="#d64545">Свои цвета</itsk-toggle>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleAppearanceComponent {
  protected leftLabel = true;

  protected colored = false;
}
