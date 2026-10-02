import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ItskToggleComponent } from '@grafit/components';

@Component({
  selector: 'app-toggle-disabled',
  imports: [ItskToggleComponent, ReactiveFormsModule],
  template: `
    <itsk-toggle [formControl]="control">Реактивная форма</itsk-toggle>
    <br />
    Value: {{ control.value }}
    <br />
    <button class="button_default" (click)="toggleDisabled()">{{ control.disabled ? 'Разблокировать' : 'Заблокировать' }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleDisabledComponent {
  protected control = new FormControl(true);

  protected toggleDisabled() {
    if (this.control.disabled) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }
}
