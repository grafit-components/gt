import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, DOC_IMPORTS } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-style-spacing-page',
  imports: [DOC_IMPORTS, DecimalPipe],
  template: `
    <app-doc-page group="Стили" title="Отступы, рамки и тени">
      <p lead>
        Все размеры в библиотеке кратны четырём пикселям. Шкала из пятнадцати шагов <code>$space-0 … $space-14</code> используется для
        отступов, высот, радиусов и толщин рамок, а служебные классы позволяют применять её прямо в разметке.
      </p>

      <app-doc-section title="Шкала отступов">
        <table class="table">
          <thead>
            <tr>
              <th>Шаг</th>
              <th>Переменная</th>
              <th>Значение</th>
              <th>Размер</th>
            </tr>
          </thead>
          <tbody>
            @for (step of steps; track step) {
              <tr>
                <td>{{ step }}</td>
                <td>
                  <code>$space-{{ step }}</code>
                </td>
                <td>{{ step * 0.4 | number: '1.0-1' }}rem · {{ step * 4 }}px</td>
                <td><div class="bar background-color_primary" [style.width.rem]="step * 0.4"></div></td>
              </tr>
            }
          </tbody>
        </table>
      </app-doc-section>

      <app-doc-section title="Классы отступов и высот">
        <p class="margin-b-3">
          Вместо <code>N</code> подставляется шаг шкалы от 0 до 14. Классы отступов выставляют значение с <code>!important</code>.
        </p>
        <app-doc-code [code]="spacingCode" />
        <app-api-table title="Шаблоны имён" nameLabel="Класс" [rows]="spacingClasses" />
      </app-doc-section>

      <app-doc-section title="Рамки и скругления">
        <p class="margin-b-3">
          Класс рамки задаёт только стиль и толщину, цвет добавляется классом <code>border-color_*</code>. Скругления идут по первым шести
          шагам шкалы.
        </p>
        <div class="demo-row margin-b-3">
          @for (size of borderSizes; track size) {
            <div class="demo-box border-color_primary" [class]="'border-' + size">border-{{ size }}</div>
          }
          <div class="demo-box border-color_primary border-b-2px">border-b-2px</div>
          <div class="demo-box border-color_primary border-l-4px">border-l-4px</div>
        </div>
        <div class="demo-row margin-b-3">
          @for (radius of radiuses; track radius) {
            <div class="demo-box border-1px border-color_primary" [class]="'border-radius-' + radius">radius-{{ radius }}</div>
          }
        </div>
        <app-api-table title="Шаблоны имён" nameLabel="Класс" [rows]="borderClasses" />
      </app-doc-section>

      <app-doc-section title="Тени">
        <p class="margin-b-3">
          Три уровня тени. Класс без направления даёт равномерную тень, с направлением <code>b</code>, <code>l</code> или <code>r</code> —
          смещённую вниз, влево или вправо.
        </p>
        <div class="demo-row demo-row_shadow margin-b-3">
          @for (shadow of shadows; track shadow) {
            <div class="demo-box background-color_default" [class]="shadow">{{ shadow }}</div>
          }
        </div>
        <app-api-table title="Уровни" nameLabel="Переменная" [rows]="shadowLevels" />
      </app-doc-section>
    </app-doc-page>
  `,
  styles: `
    .bar {
      height: 1.2rem;
      border-radius: 0.2rem;
    }

    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1.6rem;

      &_shadow {
        gap: 3.2rem;
        padding: 1.6rem;
      }
    }

    .demo-box {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 11rem;
      height: 5.6rem;
      padding: 0 1.2rem;
      font-family: 'Roboto Mono', monospace;
      font-size: 1.1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleSpacingPageComponent {
  steps = Array.from({ length: 15 }, (_, index) => index);

  borderSizes = ['1px', '2px', '4px'];

  radiuses = [0, 1, 2, 3, 4, 5];

  shadows = ['shadow-1', 'shadow-2', 'shadow-3', 'shadow-b-1', 'shadow-b-2', 'shadow-b-3'];

  spacingCode = `<div class="padding-4 margin-b-3">Поля 16px со всех сторон, отступ снизу 12px</div>

<div class="padding-h-6 padding-v-2 height-14">Поля 24px по горизонтали и 8px по вертикали, высота 56px</div>`;

  spacingClasses: ApiRow[] = [
    { name: 'margin-N, padding-N', description: 'Отступ со всех сторон' },
    { name: 'margin-h-N, padding-h-N', description: 'Слева и справа' },
    { name: 'margin-v-N, padding-v-N', description: 'Сверху и снизу' },
    { name: 'margin-t-N, -r-N, -b-N, -l-N', description: 'С одной стороны: сверху, справа, снизу, слева; то же для padding' },
    { name: 'height-N', description: 'Высота' },
    { name: 'line-height-N', description: 'Межстрочный интервал' },
  ];

  borderClasses: ApiRow[] = [
    { name: 'border-0px, -1px, -2px, -4px', description: 'Сплошная рамка со всех сторон' },
    { name: 'border-t-1px, -r-, -b-, -l-', description: 'Рамка с одной стороны, те же четыре толщины' },
    { name: 'border-radius-0 … border-radius-5', description: 'Скругление всех углов: 0, 4, 8, 12, 16, 20 пикселей' },
    { name: 'border-radius-topLeft-N, -topRight-N, -bottomRight-N, -bottomLeft-N', description: 'Скругление одного угла' },
  ];

  shadowLevels: ApiRow[] = [
    { name: '$shadow-1', description: 'Смещение 4px, размытие 8px, прозрачность 25 %' },
    { name: '$shadow-2', description: 'Смещение 8px, размытие 8px, прозрачность 25 %' },
    { name: '$shadow-3', description: 'Смещение 16px, размытие 24px, прозрачность 36 %' },
  ];
}
