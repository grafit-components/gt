import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskSpinnerDirective } from '@grafit/components';

@Component({
  selector: 'app-spinner-basic',
  imports: [ItskSpinnerDirective],
  template: `
    <div class="position-relative border-1px border-color_default padding-5 margin-b-3" style="height: 120px" [itskSpinner]="loading">
      Содержимое блока, которое закрывается индикатором на время загрузки.
    </div>
    <button class="button_default" (click)="loading = !loading">{{ loading ? 'Скрыть индикатор' : 'Показать индикатор' }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerBasicComponent {
  protected loading = true;
}
