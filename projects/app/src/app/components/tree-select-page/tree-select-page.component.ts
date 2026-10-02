import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeSelectMultipleComponent } from '../../samples/select/tree-select-multiple.component';
import { TreeSelectComponent } from '../../samples/select/tree-select/tree-select.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';
import { SampleOptions } from '../../shared/sample/sample.component';

@Component({
  selector: 'app-tree-select-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Формы" title="ItskTreeSelectComponent">
      <p lead>
        Выпадающий список для выбора из иерархических данных. Повторяет API <code>ItskSelectComponent</code> — <code>valueRef</code>,
        <code>textRef</code>, <code>searchRef</code>, множественный выбор — и добавляет группы, которые можно сворачивать. Реализует
        <code>ControlValueAccessor</code>.
      </p>

      <app-doc-section title="Базовое использование">
        <p class="margin-b-3">
          Передайте в <code>items</code> дерево: вложенные элементы лежат в поле <code>children</code>. Элементы с
          <code>children</code> считаются группами и по умолчанию не выбираются — выбрать можно только листья.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Множественный выбор">
        <p class="margin-b-3">
          <code>[multiple]="true"</code> записывает в модель массив значений, <code>selectedRef="block"</code> показывает выбранное
          отдельными блоками. Как и в обычном селекте, режим <code>multiple</code> нельзя менять после инициализации.
        </p>
        <app-sample [options]="multipleSample" />
      </app-doc-section>

      <app-doc-section title="Группы">
        <p class="margin-b-0">
          <code>groupsSelectable</code> разрешает выбирать сами группы. <code>groupsCanHaveNoChildren</code> определяет, считать ли группой
          элемент с пустым массивом <code>children</code>. Разметку строки группы можно заменить через <code>groupItemRef</code>: в контекст
          шаблона передаются <code>item</code> и признак <code>expanded</code>.
        </p>
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectPageComponent {
  basicSample: SampleOptions = {
    title: 'Базовое использование',
    component: TreeSelectComponent,
    codePaths: ['./samples/select/tree-select/tree-select.component.ts', './samples/select/tree-select/tree-select.component.html'],
  };
  multipleSample = sample('Множественный выбор', TreeSelectMultipleComponent, 'select/tree-select-multiple');

  inputs: ApiRow[] = [
    { name: 'items', type: 'TreeSelectItem[]', description: 'Дерево данных, вложенность через поле children' },
    { name: 'valueRef', type: 'string | ((item) => any)', default: '(item) => item', description: 'Поле или функция значения для модели' },
    { name: 'textRef', type: 'string | TemplateRef', description: 'Поле или шаблон для отображения элемента' },
    { name: 'groupItemRef', type: 'string | TemplateRef', description: 'Поле или шаблон для строки группы' },
    { name: 'searchRef', type: 'string | ((item) => string)', description: 'Поле или функция для поиска (включает поле ввода)' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Множественный выбор (нельзя менять после инициализации)' },
    { name: 'selectedRef', type: "TemplateRef | 'block'", description: 'Шаблон выбранного значения или режим блоков' },
    { name: 'placeholder', type: 'string | TemplateRef', description: 'Текст или шаблон при отсутствии выбора' },
    { name: 'showClearButton', type: 'boolean', default: 'false', description: 'Показывать кнопку очистки значения' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать селект' },
    { name: 'groupsSelectable', type: 'boolean', default: 'false', description: 'Разрешить выбор групп' },
    { name: 'groupsCanHaveNoChildren', type: 'boolean', default: 'true', description: 'Считать группой элемент с пустым children' },
    { name: 'height', type: 'string', default: "'40vh'", description: 'Максимальная высота области прокрутки' },
    { name: 'itemSize', type: 'number', default: '32', description: 'Высота строки списка в px' },
    { name: 'fixed', type: 'boolean', default: 'false', description: 'Позиционировать список через position: fixed' },
    { name: 'panelOpen', type: 'boolean', default: 'false', description: 'Управление состоянием открытия списка' },
    { name: 'debug', type: 'boolean', default: 'false', description: 'Не закрывать список при потере фокуса — для отладки стилей' },
  ];
}
