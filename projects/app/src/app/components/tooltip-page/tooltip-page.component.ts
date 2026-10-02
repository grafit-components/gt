import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HintBasicComponent } from '../../samples/hint/hint-basic.component';
import { TooltipBasicComponent } from '../../samples/tooltip/tooltip-basic.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-tooltip-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Оверлеи и обратная связь" title="itskTooltip и itskHint">
      <p lead>
        Две директивы для всплывающих подсказок. <code>itskTooltip</code> открывается по клику и закрывается кликом снаружи — подходит для
        содержимого, с которым нужно взаимодействовать. <code>itskHint</code> показывается при наведении и исчезает, когда курсор уходит.
      </p>

      <app-doc-section title="itskTooltip">
        <p class="margin-b-3">
          Содержимым может быть строка, шаблон или компонент. Положение относительно элемента задаёт
          <code>itskTooltipConfig.position</code>, по умолчанию подсказка открывается сверху. Данные из <code>itskTooltipData</code> шаблон
          получает как неявную переменную, а компонент — через внедрение <code>ItskDynamicData</code>.
        </p>
        <app-sample [options]="tooltipSample" />
      </app-doc-section>

      <app-doc-section title="itskHint">
        <p class="margin-b-3">
          Принимает строку, шаблон или компонент. Подсказка выводится над элементом в общем контейнере поверх страницы, поэтому не
          обрезается родителями с <code>overflow: hidden</code>. При пустом значении подсказка не показывается.
        </p>
        <app-sample [options]="hintSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="itskTooltip" [rows]="tooltipInputs" />
        <app-api-table title="itskHint" [rows]="hintInputs" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPageComponent {
  tooltipSample = sample('Положение и шаблон с данными', TooltipBasicComponent, 'tooltip/tooltip-basic');
  hintSample = sample('Подсказка при наведении', HintBasicComponent, 'hint/hint-basic');

  tooltipInputs: ApiRow[] = [
    { name: 'itskTooltip', type: 'string | TemplateRef | Type', description: 'Содержимое подсказки' },
    { name: 'itskTooltipData', type: 'any', description: 'Данные для шаблона или компонента' },
    { name: 'itskTooltipConfig.position', type: 'ItskTooltipPosition', default: 'Top', description: 'Положение: Top, Bottom, Left, Right' },
    { name: 'itskTooltipConfig.delay', type: 'number', description: 'Объявлен, но директивой не используется' },
  ];

  hintInputs: ApiRow[] = [
    { name: 'itskHint', type: 'string | TemplateRef | Type', description: 'Содержимое подсказки' },
    { name: 'itskHintClass', type: 'string | string[]', description: 'Дополнительные CSS-классы контейнера подсказки' },
    { name: 'zIndex', type: 'number', default: '1', description: 'z-index контейнера подсказки' },
  ];
}
