import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, DOC_IMPORTS } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-style-setup-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Стили" title="Подключение и темы">
      <p lead>
        Стили библиотеки — это набор SCSS-файлов в папке <code>styles</code> пакета. Они собираются в приложении и настраиваются одной
        Sass-картой цветов <code>$blocks</code>. Каждая тема — отдельный CSS-файл, собранный со своей картой; CSS-переменных для цветов в
        библиотеке нет.
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
          контрастные панели, например шапка. В каждом блоке девять акцентов, у каждого акцента три цвета. Если карту не передать,
          используются цвета из <code>styles/color</code> библиотеки.
        </p>
        <app-doc-code [code]="blocksCode" lang="scss" />
        <app-api-table title="Акценты" nameLabel="Акцент" [rows]="accents" />
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
// ... secondary, ghost, success, warning, error, info, focus

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
}
