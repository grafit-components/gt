import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskHintDirective } from '@grafit/components';

@Component({
  selector: 'app-hint-basic',
  imports: [ItskHintDirective],
  template: `
    <span class="margin-r-5" itskHint="Подсказка появляется при наведении">Текстовая подсказка</span>

    <span [itskHint]="rich">Подсказка с шаблоном</span>

    <ng-template #rich>Можно использовать <b>разметку</b></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintBasicComponent {}
