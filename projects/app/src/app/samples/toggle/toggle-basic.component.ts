import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskToggleComponent } from '@grafit/components';

@Component({
  selector: 'app-toggle-basic',
  imports: [ItskToggleComponent, FormsModule],
  template: `
    <itsk-toggle [(ngModel)]="value">Получать уведомления</itsk-toggle>
    <br />
    Value: {{ value }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleBasicComponent {
  protected value = false;
}
