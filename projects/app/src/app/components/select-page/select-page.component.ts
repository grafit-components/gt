import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectCustomTemplateComponent } from '../../samples/select/select-custom-template/select-custom-template.component';
import { SelectMultipleComponent } from '../../samples/select/select-multiple/select-multiple.component';
import { SelectPanelControlComponent } from '../../samples/select/select-panel-control/select-panel-control.component';
import { SelectPlaceholderComponent } from '../../samples/select/select-placeholder/select-placeholder.component';
import { SelectVirtualComponent } from '../../samples/select/select-virtual/select-virtual.component';
import { SelectComponent } from '../../samples/select/select/select.component';
import { DocViewerComponent } from '../../shared/doc-viewer/doc-viewer.component';
import { SampleComponent, SampleOptions } from '../../shared/sample/sample.component';

@Component({
  selector: 'app-select-page',
  imports: [SampleComponent, DocViewerComponent],
  templateUrl: './select-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {
  basicCode = `<itsk-select
  [items]="items"
  [(ngModel)]="selectedValue"
  valueRef="value"
  textRef="label"
  searchRef="label"
  showClearButton="true"
/>`;

  valueRefCode = `<!-- записывать в модель поле value -->
<itsk-select valueRef="value" />

<!-- или произвольное вычисляемое значение: getId = (item) => item.id -->
<itsk-select [valueRef]="getId" />`;

  customTemplateCode = `<itsk-select [items]="items" [(ngModel)]="selectedValue" valueRef="id" [textRef]="userTpl" searchRef="name" />

<ng-template #userTpl let-item="item">
  <b>{{ item.name }}</b> — {{ item.role }}
</ng-template>`;

  panelControlCode = `<itsk-select #sel [items]="items" ... />
<button (click)="sel.toggle()">Переключить</button>`;

  basicSample: SampleOptions = {
    title: 'Базовое использование',
    component: SelectComponent,
    codePaths: ['./samples/select/select/select.component.ts', './samples/select/select/select.component.html'],
  };

  multipleSample: SampleOptions = {
    title: 'Множественный выбор',
    component: SelectMultipleComponent,
    codePaths: ['./samples/select/select-multiple/select-multiple.component.ts', './samples/select/select-multiple/select-multiple.component.html'],
  };

  placeholderSample: SampleOptions = {
    title: 'Placeholder и блокировка',
    component: SelectPlaceholderComponent,
    codePaths: ['./samples/select/select-placeholder/select-placeholder.component.ts', './samples/select/select-placeholder/select-placeholder.component.html'],
  };

  customTemplateSample: SampleOptions = {
    title: 'Кастомный шаблон',
    component: SelectCustomTemplateComponent,
    codePaths: [
      './samples/select/select-custom-template/select-custom-template.component.ts',
      './samples/select/select-custom-template/select-custom-template.component.html',
    ],
  };

  virtualSample: SampleOptions = {
    title: 'Виртуальный скролл (1000 элементов)',
    component: SelectVirtualComponent,
    codePaths: ['./samples/select/select-virtual/select-virtual.component.ts', './samples/select/select-virtual/select-virtual.component.html'],
  };

  panelControlSample: SampleOptions = {
    title: 'Программное управление',
    component: SelectPanelControlComponent,
    codePaths: ['./samples/select/select-panel-control/select-panel-control.component.ts', './samples/select/select-panel-control/select-panel-control.component.html'],
  };
}
