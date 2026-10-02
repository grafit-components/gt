import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeBasicComponent } from '../../samples/tree/tree-basic.component';
import { TreeControlComponent } from '../../samples/tree/tree-control.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-tree-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Данные и раскладка" title="ItskTreeComponent">
      <p lead>
        Дерево для иерархических данных. Компонент отвечает только за вложенность и состояние раскрытия, а разметку узла целиком задаёт
        приложение через шаблон <code>itskTreeTemplate</code>.
      </p>

      <app-doc-section title="Базовое использование">
        <p class="margin-b-3">
          Передайте корневые узлы в <code>data</code>; дочерние по умолчанию берутся из поля <code>children</code>. Шаблон узла получает сам
          узел как неявную переменную, а также <code>control</code> — объект управления деревом — и <code>index</code>. Раскрытие не
          привязано к конкретному элементу: вызовите <code>control.toggle(item)</code> там, где удобно, например по клику на
          <code>itsk-tree-item</code>.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Свой ItskTreeControl">
        <p class="margin-b-3">
          Если нужно развернуть всё дерево сразу, брать дочерние узлы из другого поля или управлять раскрытием из своего кода, создайте
          <code>ItskTreeControl</code> сами и передайте его в <code>control</code>. Чтобы только развернуть всё с самого начала, достаточно
          параметра <code>[open]="true"</code>.
        </p>
        <p class="margin-b-3">
          <strong>Важно:</strong> <code>toggle()</code> меняет состояние мутацией, а дерево работает в режиме <code>OnPush</code>. Вызов из
          шаблона узла перерисует дерево, а вызов из внешнего кода — нет, пока в дереве не произойдёт своё событие.
        </p>
        <app-sample [options]="controlSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="ItskTreeComponent" [rows]="inputs" />
        <app-api-table title="Контекст шаблона itskTreeTemplate" nameLabel="Переменная" [rows]="context" />
        <app-api-table title="ItskTreeControl" nameLabel="Член класса" [rows]="control" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreePageComponent {
  basicSample = sample('Дерево подразделений', TreeBasicComponent, 'tree/tree-basic');
  controlSample = sample('Развёрнутое дерево со своим полем вложенности', TreeControlComponent, 'tree/tree-control');

  inputs: ApiRow[] = [
    { name: 'data', type: 'any[]', default: '[]', description: 'Корневые узлы дерева' },
    { name: 'open', type: 'boolean', default: 'false', description: 'Развернуть все узлы при создании (если не передан control)' },
    { name: 'control', type: 'ItskTreeControl', description: 'Свой объект управления деревом' },
  ];

  context: ApiRow[] = [
    { name: '$implicit', type: 'any', description: 'Узел дерева' },
    { name: 'control', type: 'ItskTreeControl', description: 'Объект управления деревом' },
    { name: 'index', type: 'number', description: 'Номер узла среди соседей, считая с нуля' },
  ];

  control: ApiRow[] = [
    { name: 'constructor(data, open?, getChildren?)', description: 'Данные, признак «развернуть всё» и функция получения дочерних узлов' },
    { name: 'toggle(item)', description: 'Развернуть или свернуть узел' },
    { name: 'isExpanded(item)', description: 'Развёрнут ли узел' },
    { name: 'getChildren(item)', description: 'Дочерние узлы; по умолчанию поле children' },
    { name: 'expanded', description: 'Массив развёрнутых узлов' },
  ];
}
