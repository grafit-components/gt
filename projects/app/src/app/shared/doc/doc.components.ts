import { ChangeDetectionStrategy, Component, computed, input, Type } from '@angular/core';
import { DocumentLang } from '../doc-viewer/code-to-html.service';
import { DocViewerComponent } from '../doc-viewer/doc-viewer.component';
import { SampleComponent, SampleOptions } from '../sample/sample.component';

/** Каркас страницы документации: шапка, вводный блок и секции */
@Component({
  selector: 'app-doc-page',
  template: `
    <div class="documentation color-text-contrast">
      <header class="page-header margin-b-4">
        <div class="page-header__eyebrow font-overline">{{ group() }}</div>
        <h1 class="page-header__title">{{ title() }}</h1>
      </header>

      <div class="lead border-color_info margin-b-5 font-size-4">
        <ng-content select="[lead]" />
      </div>

      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPageComponent {
  readonly group = input.required<string>();
  readonly title = input.required<string>();
}

/** Секция-карточка страницы документации */
@Component({
  selector: 'app-doc-section',
  template: `
    <div class="section__title font-title2 margin-b-2">{{ title() }}</div>
    <ng-content />
  `,
  host: { class: 'section margin-b-4' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocSectionComponent {
  readonly title = input.required<string>();
}

export interface ApiRow {
  name: string;
  type?: string;
  default?: string;
  description: string;
}

/** Таблица API: колонки «Тип» и «По умолчанию» выводятся, только если заполнены хотя бы в одной строке */
@Component({
  selector: 'app-api-table',
  template: `
    <div class="font-title3 margin-b-2">{{ title() }}</div>
    <table class="table">
      <thead>
        <tr>
          <th>{{ nameLabel() }}</th>
          @if (hasType()) {
            <th>Тип</th>
          }
          @if (hasDefault()) {
            <th>По умолчанию</th>
          }
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track row.name) {
          <tr>
            <td>
              <code>{{ row.name }}</code>
            </td>
            @if (hasType()) {
              <td>
                <code>{{ row.type }}</code>
              </td>
            }
            @if (hasDefault()) {
              <td>
                @if (row.default) {
                  <code>{{ row.default }}</code>
                } @else {
                  —
                }
              </td>
            }
            <td>{{ row.description }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  host: { class: 'display-block margin-b-4' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiTableComponent {
  readonly title = input.required<string>();
  readonly rows = input.required<ApiRow[]>();
  readonly nameLabel = input('Параметр');

  protected readonly hasType = computed(() => this.rows().some((row) => row.type));
  protected readonly hasDefault = computed(() => this.rows().some((row) => row.default));
}

/** Блок кода с подсветкой синтаксиса */
@Component({
  selector: 'app-doc-code',
  imports: [DocViewerComponent],
  template: `<app-doc-viewer [code]="code()" [lang]="lang()" />`,
  host: { class: 'code-block display-block margin-b-3' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocCodeComponent {
  readonly code = input.required<string>();
  readonly lang = input<DocumentLang>('html');
}

/** Всё, что нужно шаблону страницы документации */
export const DOC_IMPORTS = [DocPageComponent, DocSectionComponent, ApiTableComponent, DocCodeComponent, SampleComponent] as const;

/** Описание примера: `path` — путь к файлу примера внутри `samples` без расширения `.component.ts` */
export function sample(title: string, component: Type<unknown>, path: string): SampleOptions {
  return { title, component, codePaths: [`./samples/${path}.component.ts`] };
}
