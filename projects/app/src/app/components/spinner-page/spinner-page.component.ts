import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerBasicComponent } from '../../samples/spinner/spinner-basic.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-spinner-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Оверлеи и обратная связь" title="itskSpinner">
      <p lead>
        Директива, которая закрывает элемент индикатором загрузки. Пока значение истинно, внутрь элемента добавляется блок с классом
        <code>spinner</code>, перекрывающий содержимое.
      </p>

      <app-doc-section title="Использование">
        <p class="margin-b-3">
          Привяжите к <code>itskSpinner</code> признак загрузки. Индикатор позиционируется абсолютно, поэтому элементу нужен
          <code>position: relative</code> — например, класс <code>position-relative</code>. Директива добавляет элементу класс
          <code>relative</code>, но стилей для него в библиотеке нет.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
        <p class="margin-b-0">
          Компоненты <code>ItskSpinnerComponent</code> и <code>ItskSpinnerOverlayComponent</code> экспортируются из библиотеки, но пока
          являются заглушками — используйте директиву.
        </p>
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerPageComponent {
  basicSample = sample('Индикатор загрузки поверх блока', SpinnerBasicComponent, 'spinner/spinner-basic');

  inputs: ApiRow[] = [{ name: 'itskSpinner', type: 'boolean', default: 'false', description: 'Показывать индикатор загрузки' }];
}
