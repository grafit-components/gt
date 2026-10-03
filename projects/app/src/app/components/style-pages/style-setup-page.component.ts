import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, DOC_IMPORTS } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-style-setup-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Стили" title="Подключение и темы">
      <p lead>
        Стили библиотеки — это набор SCSS-файлов в папке <code>styles</code> пакета. Они собираются в приложении и настраиваются одной
        Sass-картой цветов <code>$blocks</code>. Каждая тема — отдельный CSS-файл, собранный со своей картой. Цвета рабочего блока
        дополнительно выводятся в CSS-переменные.
      </p>

      <app-doc-section title="Файл темы">
        <p class="margin-b-3">
          Создайте в приложении файл темы, опишите в нём цвета и передайте их в <code>index</code> библиотеки. Так устроены темы этой
          документации: <code>styles/light/styles.scss</code> и <code>styles/dark/styles.scss</code> отличаются только цветами.
        </p>
        <app-doc-code [code]="themeCode" lang="scss" />
        <p class="margin-b-0">
          Путь <code>&#64;grafit/components/styles/index</code> взят из раздела <code>exports</code> пакета. Сама документация подключает
          стили из исходников, поэтому в стороннем приложении этот путь здесь не проверялся.
        </p>
      </app-doc-section>

      <app-doc-section title="Карта цветов">
        <p class="margin-b-3">
          <code>$blocks</code> состоит из двух блоков: <code>work</code> — рабочая область, цвета по умолчанию, и <code>main</code> —
          контрастные панели, например шапка. Блок — это набор акцентов, у каждого акцента три цвета. Если карту не передать, используются
          цвета из <code>styles/color</code> библиотеки: там двенадцать акцентов. Набор акцентов определяет сама карта — классы и переменные
          создаются только для тех, что в ней перечислены. В темах этой документации акцентов девять, без <code>*_invert</code>.
        </p>
        <app-doc-code [code]="blocksCode" lang="scss" />
        <app-api-table title="Акценты" nameLabel="Акцент" [rows]="accents" />
      </app-doc-section>

      <app-doc-section title="CSS-переменные">
        <p class="margin-b-3">
          Все цвета блока <code>work</code> выводятся в <code>:root</code> как CSS-переменные с именами вида
          <code>--&lt;свойство&gt;-&lt;акцент&gt;</code>. Они меняются вместе с файлом темы, поэтому подходят для стилей компонентов
          приложения, которые собираются один раз и не знают о Sass-карте. Для блока <code>main</code> переменных нет.
        </p>
        <app-doc-code [code]="cssVarsCode" lang="scss" />
        <app-api-table title="Шаблоны имён" nameLabel="Переменная" [rows]="cssVars" />
      </app-doc-section>

      <app-doc-section title="Сборка и переключение темы">
        <p class="margin-b-3">
          Каждый файл темы собирается в отдельный CSS-файл, который не внедряется в страницу автоматически. В
          <code>angular.json</code> это настраивается так:
        </p>
        <app-doc-code [code]="angularJsonCode" lang="ts" />
        <p class="margin-b-3">
          Тема подключается обычным тегом <code>link</code>, а переключается заменой его адреса. Шрифт Roboto лежит в
          <code>assets/fonts</code> пакета и подключается отдельно.
        </p>
        <app-doc-code [code]="indexCode" />
        <app-doc-code [code]="switchCode" lang="ts" />
      </app-doc-section>

      <app-doc-section title="Переменные и миксины в своих стилях">
        <p class="margin-b-3">
          Размеры, шрифты и миксины можно использовать в стилях компонентов приложения. Корневой размер шрифта равен
          <code>10px</code>, поэтому <code>1rem = 10px</code>, а <code>$space-4</code> — это <code>1.6rem</code>, то есть 16 пикселей.
        </p>
        <app-doc-code [code]="varsCode" lang="scss" />
        <app-api-table title="Что есть в библиотеке" nameLabel="Файл" [rows]="files" />
        <app-api-table title="Миксины общего назначения" nameLabel="Миксин" [rows]="mixins" />
        <p class="margin-b-0">
          Остальные файлы <code>util/*-util</code> содержат миксины, из которых собраны стили самих компонентов: кнопок, полей, списков,
          меню, вкладок и других. Они принимают блок или акцент темы и нужны, только если вы оформляете свой блок цветов.
        </p>
      </app-doc-section>

      <app-doc-section title="Сброс стилей">
        <p class="margin-b-3">
          Вместе с библиотекой подключается сброс браузерных стилей. Он затрагивает все элементы страницы, поэтому его стоит учитывать при
          вёрстке своих компонентов.
        </p>
        <app-api-table title="Что задаёт сброс" nameLabel="Элемент" [rows]="reset" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleSetupPageComponent {
  themeCode = `// styles/light/styles.scss
@use 'colors/main-color.scss';
@use 'colors/work-color.scss';

$blocks: (
  'main': main-color.$main,
  'work': work-color.$work,
);

@use '@grafit/components/styles/index' with ($blocks: $blocks);

:root {
  color-scheme: light;
}`;

  blocksCode = `// colors/work-color.scss
$default: (
  'background-color': #ffffff,
  'color': #667b8d,
  'border-color': #e0e9f0,
);
$primary: (
  'background-color': #2f5677,
  'color': #ffffff,
  'border-color': #2fb4e9,
);
// ... secondary, ghost, success, warning, error, info, focus и другие акценты

$work: (
  'default': $default,
  'primary': $primary,
  // ...
);`;

  angularJsonCode = `"styles": [
  "src/styles.scss",
  { "input": "src/styles/light/styles.scss", "bundleName": "styles-light", "inject": false },
  { "input": "src/styles/dark/styles.scss", "bundleName": "styles-dark", "inject": false }
]`;

  indexCode = `<link id="client-theme" rel="stylesheet" href="styles-light.css" />
<link rel="stylesheet" href="assets/fonts/font.css" />`;

  switchCode = `const themeLink = document.querySelector('link#client-theme') as HTMLLinkElement;

themeLink.href = theme === 'dark' ? 'styles-dark.css' : 'styles-light.css';`;

  varsCode = `@use '@grafit/components/styles/vars' as vars;
@use '@grafit/components/styles/font' as font;
@use '@grafit/components/styles/util/font-util' as font-util;
@use '@grafit/components/styles/util/shadow-util' as shadow-util;

.card {
  padding: vars.$space-4;
  border-radius: vars.$borderRadius-2;
  @include font-util.fontHelper(font.$font-body2);
  @include shadow-util.shadow-b(vars.$shadow-1);
}`;

  accents: ApiRow[] = [
    { name: 'default', description: 'Обычный текст и фон блока' },
    { name: 'secondary', description: 'Второстепенные элементы' },
    { name: 'primary', description: 'Главное действие' },
    { name: 'ghost', description: 'Элементы без заливки' },
    { name: 'success', description: 'Успех' },
    { name: 'warning', description: 'Предупреждение' },
    { name: 'error', description: 'Ошибка' },
    { name: 'info', description: 'Информация и ссылки' },
    { name: 'focus', description: 'Элемент в фокусе' },
    { name: 'success_invert, warning_invert, error_invert', description: 'Те же статусы с насыщенным фоном и белым текстом' },
  ];

  cssVarsCode = `.report-card {
  color: var(--color-default);
  background-color: var(--background-color-default);
  border: 1px solid var(--border-color-default);
}

.report-card_failed {
  border-color: var(--border-color-error);
}`;

  cssVars: ApiRow[] = [
    { name: '--color-<акцент>', description: 'Цвет текста акцента' },
    { name: '--background-color-<акцент>', description: 'Цвет фона акцента' },
    { name: '--border-color-<акцент>', description: 'Цвет рамки акцента' },
  ];

  files: ApiRow[] = [
    { name: 'index', description: 'Все стили библиотеки, принимает $blocks' },
    { name: 'vars', description: 'Отступы, размеры шрифтов, радиусы, толщины рамок, тени' },
    { name: 'font', description: 'Карты шрифтовых стилей $font-h1 … $font-overline' },
    { name: 'util/font-util', description: 'Миксины fontHelper и fontHelperImportant' },
    { name: 'util/shadow-util', description: 'Миксины shadow, shadow-t, shadow-b, shadow-l, shadow-r' },
    { name: 'border', description: 'Миксин borderRadius($size)' },
    { name: 'util/*-util', description: 'Миксины отдельных компонентов: кнопки, поля, скроллбар и другие' },
  ];

  mixins: ApiRow[] = [
    { name: 'shape-util.baseShape($accent)', description: 'Рамка, фон и цвет текста акцента; фон активного состояния' },
    { name: 'shape-util.baseBorder, baseBackground, baseColor', description: 'То же по отдельности' },
    { name: 'shape-util.baseRadius()', description: 'Скругление 4 пикселя' },
    { name: 'shape-util.baseShadow()', description: 'Базовая тень вниз первого уровня' },
    { name: 'state-util.baseState($color)', description: 'Фон и его состояния: наведение, нажатие, _active, _disabled' },
    { name: 'state-util.baseHover($color)', description: 'Изменение фона на 5 % при наведении' },
    { name: 'state-util.baseFocus($blockItem)', description: 'Рамка цвета фокуса при :focus и для класса _focus' },
    { name: 'state-util.cursorPointer()', description: 'Курсор-указатель при наведении' },
    { name: 'scrollbar-util.scrollbarBasis()', description: 'Прокрутка с тонкой полосой в цветах темы' },
    { name: 'scrollbar-util.scrollbarHidden()', description: 'Полоса прокрутки видна только при наведении' },
    { name: 'scrollbar-util.scrollbarInvisible()', description: 'Прокрутка без полосы' },
    { name: 'marker-util.marker(), markerAccent($accent)', description: 'Форма и цвета метки' },
    { name: 'card-util.card()', description: 'Поля и отступы карточки' },
  ];

  reset: ApiRow[] = [
    { name: 'html', description: 'Размер шрифта 10px — основа для rem' },
    { name: '*', description: 'Шрифт Roboto, нулевые margin и padding, box-sizing: border-box' },
    { name: ':focus', description: 'Обводка браузера убрана у всех элементов' },
    { name: ':focus-visible', description: 'Обводка 2 пикселя цветом рамки акцента focus при фокусе с клавиатуры; кроме input и textarea' },
    { name: 'body', description: 'Фон и цвет текста акцента default блока work, размер 1.2rem, интервал 1.5, высота 100vh' },
    { name: 'h1 … h6', description: 'Размеры и насыщенность стилей font-h1 … font-h6' },
    { name: 'p', description: 'Стиль font-body3' },
    { name: 'a', description: 'Цвет акцента info, без подчёркивания, одна строка с многоточием' },
    { name: 'li', description: 'Без маркеров списка' },
    { name: 'table', description: 'Схлопнутые рамки, выравнивание влево' },
    { name: 'fieldset', description: 'Без рамки и отступов' },
  ];
}
