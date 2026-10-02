import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskCheckboxComponent } from '@grafit/components';

@Component({
  selector: 'app-checkbox-disabled',
  imports: [ItskCheckboxComponent, FormsModule],
  template: `
    <itsk-checkbox [(ngModel)]="value" [binary]="true" [disabled]="disabled">Чекбокс</itsk-checkbox>
    <br />
    <button class="button_default" (click)="disabled = !disabled">{{ disabled ? 'Разблокировать' : 'Заблокировать' }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxDisabledComponent {
  protected value = true;

  protected disabled = true;
}
