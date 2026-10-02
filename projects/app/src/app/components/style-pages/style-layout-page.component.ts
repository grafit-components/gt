import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, DOC_IMPORTS } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-style-layout-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Стили" title="Раскладка и утилиты">
      <p lead>
        Раскладка строится на флексбоксе: класс <code>container</code> и его модификаторы задают строки, колонки и сетку из двенадцати
        частей. Остальное — мелкие служебные классы для выравнивания, переполнения и позиционирования.
      </p>

      <app-doc-section title="Контейнер и сетка">
        <p class="margin-b-3">
          <code>container</code> — флекс-строка, <code>container_column</code> — колонка. Дочерним элементам задают ширину в долях от
          двенадцати классом <code>container_N</code> либо отдают всё свободное место классом <code>container_auto</code>.
        </p>
        <div class="container margin-b-2">
          <div class="cell container_3">container_3</div>
          <div class="cell container_6">container_6</div>
          <div class="cell container_3">container_3</div>
        </div>
        <div class="container margin-b-3">
          <div class="cell container_2">container_2</div>
          <div class="cell container_auto">container_auto</div>
        </div>
        <app-doc-code [code]="containerCode" />
      </app-doc-section>

      <app-doc-section title="Каркас приложения">
        <p class="margin-b-3">
          Для типовой страницы есть готовые классы: <code>app</code> — колонка на всю высоту, <code>toolbar</code> — шапка высотой 56
          пикселей. Класс <code>block-main</code> переключает шапку на контрастные цвета. Так свёрстана эта документация.
        </p>
        <app-doc-code [code]="appCode" />
      </app-doc-section>

      <app-doc-section title="Служебные классы">
        <app-api-table title="Флексбокс" nameLabel="Класс" [rows]="flexClasses" />
        <app-api-table title="Отображение и позиционирование" nameLabel="Класс" [rows]="displayClasses" />
        <app-api-table title="Переполнение и прокрутка" nameLabel="Класс" [rows]="overflowClasses" />
      </app-doc-section>
    </app-doc-page>
  `,
  styles: `
    .cell {
      padding: 0.8rem 1.2rem;
      border: 1px dashed rgba(128, 128, 128, 0.6);
      background-color: rgba(128, 128, 128, 0.12);
      font-family: 'Roboto Mono', monospace;
      font-size: 1.1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleLayoutPageComponent {
  containerCode = `<div class="container">
  <div class="container_3">Четверть ширины</div>
  <div class="container_6">Половина</div>
  <div class="container_3">Четверть</div>
</div>

<div class="container container_column">
  <div>Шапка по высоте содержимого</div>
  <div class="container_auto scrollbar">Остальная высота с прокруткой</div>
</div>`;

  appCode = `<div class="app">
  <div class="block-main toolbar shadow shadow-b-2">Шапка</div>
  <div class="container container_auto overflow-hidden">
    <div class="container border-r-1px border-color_default">Меню</div>
    <div class="container container_column container_auto scrollbar">Содержимое</div>
  </div>
</div>`;

  flexClasses: ApiRow[] = [
    { name: 'container', description: 'Флекс-строка' },
    { name: 'container_column', description: 'Флекс-колонка без переноса' },
    { name: 'container_1 … container_12', description: 'Фиксированная доля ширины из двенадцати' },
    { name: 'container_auto', description: 'Занять свободное место, разрешить сжатие' },
    { name: 'flex, flex-column, flex-wrap, flex-nowrap', description: 'Флекс-контейнер и его направление, с !important' },
    { name: 'align-center, -start, -end, -stretch, -baseline', description: 'Выравнивание по поперечной оси' },
    { name: 'justify-content-between, -around, -start, -end, -center', description: 'Распределение по главной оси' },
    { name: 'flex-grow-0 … flex-grow-4', description: 'Коэффициент роста' },
    { name: 'shrink-0 … shrink-4', description: 'Коэффициент сжатия' },
    { name: 'flex-shrink', description: 'Разрешить элементу сжиматься меньше своего содержимого' },
  ];

  displayClasses: ApiRow[] = [
    { name: 'display-block, -inline-block, -inline, -flex, -inline-flex', description: 'Свойство display, с !important' },
    { name: 'position-relative, -absolute, -fixed', description: 'Свойство position' },
    { name: 'float__left, float__right, clear', description: 'Обтекание и его сброс' },
    { name: 'cursor_pointer', description: 'Курсор-указатель при наведении' },
  ];

  overflowClasses: ApiRow[] = [
    { name: 'overflow-hidden, -auto, -scroll', description: 'Переполнение по обеим осям' },
    { name: 'overflow-x-hidden, -x-auto, -x-scroll', description: 'Переполнение по горизонтали' },
    { name: 'overflow-y-hidden, -y-auto, -y-scroll', description: 'Переполнение по вертикали' },
    { name: 'scrollbar', description: 'Прокрутка с полосой в стиле библиотеки' },
    { name: 'scrollbar_hidden, scrollbar_invisible', description: 'Модификаторы: скрытая и невидимая полоса прокрутки' },
  ];
}
