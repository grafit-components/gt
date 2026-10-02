import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocEntry, DOCS, NOT_DOCUMENTED } from '../../docs';

@Component({
  selector: 'app-overview-page',
  imports: [RouterLink],
  template: `
    <div class="documentation color-text-contrast">
      <header class="page-header margin-b-4">
        <div class="page-header__eyebrow font-overline">Дизайн-система</div>
        <h1 class="page-header__title">&#64;grafit/components</h1>
      </header>

      <div class="lead border-color_info margin-b-5 font-size-4">
        <p>
          Библиотека Angular-компонентов Grafit. На каждой странице — описание компонента, живые примеры с исходным кодом и таблицы API.
          Тема переключается кнопкой в правом верхнем углу.
        </p>
      </div>

      @for (group of groups; track group.name) {
        <div class="font-title2 margin-b-3">{{ group.name }}</div>
        <div class="overview-grid margin-b-5">
          @for (doc of group.docs; track doc.path) {
            <a class="section overview-card" [routerLink]="'/' + doc.path">
              <div class="font-title3 margin-b-1">{{ doc.name }}</div>
              <div>{{ doc.description }}</div>
            </a>
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewPageComponent {
  protected groups = [...new Set(DOCS.map((doc) => doc.group))].map((name) => ({
    name,
    docs: DOCS.filter((doc: DocEntry) => doc.group === name),
  }));

  protected notDocumented = NOT_DOCUMENTED;
}
