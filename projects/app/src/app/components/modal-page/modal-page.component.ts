import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalComponentComponent } from '../../samples/modal/modal-component.component';
import { ModalTemplateComponent } from '../../samples/modal/modal-template.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-modal-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Оверлеи и обратная связь" title="ItskModalService">
      <p lead>
        Сервис модальных окон. Окно создаётся из кода методом <code>create()</code>, содержимым может быть строка, шаблон или компонент.
        Сервис предоставляется в корневом инжекторе, окна складываются в стек, фокус получает верхнее.
      </p>

      <app-doc-section title="Окно из шаблона">
        <p class="margin-b-3">
          Передайте в <code>create()</code> <code>TemplateRef</code> и объект с данными. Данные доступны в шаблоне через неявную переменную,
          функция закрытия — через <code>let-close="close"</code>. Метод возвращает <code>ItskModalInstance</code>: подпишитесь на
          <code>onClose</code>, чтобы получить результат.
        </p>
        <p class="margin-b-3">
          Результат закрытия — объект <code>IModalResult</code> с обязательной причиной <code>reason</code> и любыми дополнительными полями.
          При закрытии клавишей <code>Esc</code> и кликом по затемнению причину выставляет сам сервис.
        </p>
        <p class="margin-b-3">
          Содержимое окна размечается тремя блоками: <code>modal__head</code> — шапка, <code>modal__content</code> — тело,
          <code>modal__foot</code> — подвал с кнопками, прижатыми вправо. У каждого блока поля по 12 пикселей. Ширину окна задаёт само
          содержимое, минимальный размер — 200 на 100 пикселей.
        </p>
        <app-sample [options]="templateSample" />
      </app-doc-section>

      <app-doc-section title="Окно из компонента">
        <p class="margin-b-3">
          Если содержимое — компонент, он получает управление окном и данные через внедрение зависимостей:
          <code>ItskCurrentModal</code> с методом <code>close()</code> и <code>ItskDynamicData</code> с переданными полями.
        </p>
        <p class="margin-b-3">
          <strong>Важно:</strong> не называйте поля компонента так же, как ключи переданных данных. Сервис пытается записать данные в
          одноимённые поля экземпляра, но из-за ошибки записывает <code>undefined</code> и затирает их начальные значения. Читайте данные
          только из <code>ItskDynamicData</code>.
        </p>
        <app-sample [options]="componentSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="ItskModalService" nameLabel="Метод" [rows]="methods" />
        <app-api-table title="ItskModalConfig" [rows]="config" />
        <app-api-table title="ItskModalInstance" nameLabel="Член класса" [rows]="instance" />
        <app-api-table title="ItskModalCloseReason" nameLabel="Значение" [rows]="reasons" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPageComponent {
  templateSample = sample('Подтверждение из шаблона', ModalTemplateComponent, 'modal/modal-template');
  componentSample = sample('Диалог-компонент с результатом', ModalComponentComponent, 'modal/modal-component');

  methods: ApiRow[] = [
    { name: 'create(content, data?, config?, injector?)', description: 'Открыть окно, возвращает ItskModalInstance' },
    { name: 'closeAll()', description: 'Закрыть все открытые окна с причиной Exit' },
    { name: 'any()', description: 'Есть ли открытые окна' },
  ];

  config: ApiRow[] = [
    { name: 'backdrop', type: 'boolean', default: 'true', description: 'Затемнение фона и закрытие по клику на него' },
    { name: 'esc', type: 'boolean', default: 'true', description: 'Закрывать по клавише Esc' },
    { name: 'class', type: 'string[]', default: '[]', description: 'Дополнительные CSS-классы окна' },
    { name: 'resizable', type: 'boolean', default: 'false', description: 'Добавляет контейнеру класс modal__container_resize' },
    { name: 'draggable', type: 'boolean', default: 'false', description: 'Объявлен, но компонентом окна не используется' },
    { name: 'beforeOpen', type: 'Observable<any>', description: 'Объявлен, но сервисом не используется' },
    { name: 'beforeClose', type: 'Observable<any>', description: 'Объявлен, но сервисом не используется' },
  ];

  instance: ApiRow[] = [
    { name: 'onClose', description: 'Observable с результатом IModalResult, завершается после закрытия' },
    { name: 'close(result?)', description: 'Закрыть окно; без аргумента причина — Exit' },
    { name: 'component', description: 'ComponentRef содержимого, если окно создано из компонента' },
    { name: 'window', description: 'ComponentRef контейнера окна' },
  ];

  reasons: ApiRow[] = [
    { name: 'Resolve', description: 'Пользователь подтвердил действие' },
    { name: 'Exit', description: 'Окно закрыто без подтверждения' },
    { name: 'Backdrop', description: 'Клик по затемнению' },
    { name: 'Esc', description: 'Нажата клавиша Esc' },
  ];
}
