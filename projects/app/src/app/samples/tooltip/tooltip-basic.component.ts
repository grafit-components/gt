import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskTooltipDirective, ItskTooltipPosition } from '@grafit/components';

@Component({
  selector: 'app-tooltip-basic',
  imports: [ItskTooltipDirective],
  template: `
    <div class="padding-v-8 padding-h-8">
      @for (position of positions; track position.value) {
        <button class="button_default margin-r-3" itskTooltip="Текст подсказки" [itskTooltipConfig]="{ position: position.value }">
          {{ position.name }}
        </button>
      }

      <button class="button_default" [itskTooltip]="details" [itskTooltipData]="{ author: 'Иванов И.' }">Шаблон</button>
    </div>

    <ng-template #details let-data>
      Автор: <b>{{ data.author }}</b>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipBasicComponent {
  protected positions = [
    { name: 'Сверху', value: ItskTooltipPosition.Top },
    { name: 'Снизу', value: ItskTooltipPosition.Bottom },
    { name: 'Слева', value: ItskTooltipPosition.Left },
    { name: 'Справа', value: ItskTooltipPosition.Right },
  ];
}
