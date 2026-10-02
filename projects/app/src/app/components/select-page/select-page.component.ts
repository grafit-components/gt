import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectCustomTemplateComponent } from '../../samples/select/select-custom-template/select-custom-template.component';
import { SelectMultipleComponent } from '../../samples/select/select-multiple/select-multiple.component';
import { SelectPanelControlComponent } from '../../samples/select/select-panel-control/select-panel-control.component';
import { SelectPlaceholderComponent } from '../../samples/select/select-placeholder/select-placeholder.component';
import { SelectVirtualComponent } from '../../samples/select/select-virtual/select-virtual.component';
import { SelectComponent } from '../../samples/select/select/select.component';
import { SampleComponent, SampleOptions } from '../../shared/sample/sample.component';

@Component({
  selector: 'app-select-page',
  imports: [SampleComponent],
  templateUrl: './select-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {
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
