import { Type } from '@angular/core';
import { AutocompletePageComponent } from './components/autocomplete-page/autocomplete-page.component';
import { BreadcrumbPageComponent } from './components/breadcrumb-page/breadcrumb-page.component';
import { CheckboxPageComponent } from './components/checkbox-page/checkbox-page.component';
import { DatePickerPageComponent } from './components/date-picker-page/date-picker-page.component';
import { DropdownPageComponent } from './components/dropdown-page/dropdown-page.component';
import { FileUploadPageComponent } from './components/file-upload-page/file-upload-page.component';
import { IconsPageComponent } from './components/icons-page/icons-page.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { MenuPageComponent } from './components/menu-page/menu-page.component';
import { ModalPageComponent } from './components/modal-page/modal-page.component';
import { NavigationPageComponent } from './components/navigation-page/navigation-page.component';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';
import { RadioPageComponent } from './components/radio-page/radio-page.component';
import { SelectPageComponent } from './components/select-page/select-page.component';
import { SpinnerPageComponent } from './components/spinner-page/spinner-page.component';
import { TabsPageComponent } from './components/tabs-page/tabs-page.component';
import { TogglePageComponent } from './components/toggle-page/toggle-page.component';
import { TooltipPageComponent } from './components/tooltip-page/tooltip-page.component';
import { TreePageComponent } from './components/tree-page/tree-page.component';
import { TreeSelectPageComponent } from './components/tree-select-page/tree-select-page.component';
import { UtilsPageComponent } from './components/utils-page/utils-page.component';
import { ValidatePageComponent } from './components/validate-page/validate-page.component';

export interface DocEntry {
  /** Адрес страницы без ведущего слэша */
  path: string;
  /** Название в меню и на обзорной странице */
  name: string;
  group: string;
  description: string;
  component: Type<unknown>;
}

/** Единый список страниц документации: из него строятся маршруты, боковое меню и обзорная страница */
export const DOCS: DocEntry[] = [
  {
    path: 'checkbox',
    name: 'Чекбокс',
    group: 'Формы',
    description: 'Одиночный флаг или выбор нескольких значений',
    component: CheckboxPageComponent,
  },
  { path: 'radio', name: 'Радиокнопки', group: 'Формы', description: 'Выбор одного значения из нескольких', component: RadioPageComponent },
  {
    path: 'toggle',
    name: 'Переключатель',
    group: 'Формы',
    description: 'Булево значение «включено / выключено»',
    component: TogglePageComponent,
  },
  {
    path: 'select',
    name: 'Селект',
    group: 'Формы',
    description: 'Выпадающий список с поиском и множественным выбором',
    component: SelectPageComponent,
  },
  {
    path: 'tree-select',
    name: 'Древовидный селект',
    group: 'Формы',
    description: 'Выбор из иерархических данных',
    component: TreeSelectPageComponent,
  },
  {
    path: 'autocomplete',
    name: 'Автодополнение',
    group: 'Формы',
    description: 'Текстовое поле с подсказками',
    component: AutocompletePageComponent,
  },
  {
    path: 'date-picker',
    name: 'Дата и время',
    group: 'Формы',
    description: 'Календарь, выбор месяца, поля даты и времени',
    component: DatePickerPageComponent,
  },
  {
    path: 'file-upload',
    name: 'Загрузка файлов',
    group: 'Формы',
    description: 'Область и кнопка выбора файлов',
    component: FileUploadPageComponent,
  },

  {
    path: 'menu',
    name: 'Меню',
    group: 'Навигация',
    description: 'Вертикальное меню с группами и вложенностью',
    component: MenuPageComponent,
  },
  {
    path: 'breadcrumb',
    name: 'Хлебные крошки',
    group: 'Навигация',
    description: 'Путь до текущей страницы по данным меню',
    component: BreadcrumbPageComponent,
  },
  { path: 'tabs', name: 'Вкладки', group: 'Навигация', description: 'Переключение содержимого по вкладкам', component: TabsPageComponent },
  {
    path: 'navigation',
    name: 'Панель навигации',
    group: 'Навигация',
    description: 'Выезжающая панель с меню приложения',
    component: NavigationPageComponent,
  },

  { path: 'list', name: 'Список', group: 'Данные и раскладка', description: 'Пункты, группы и разделители', component: ListPageComponent },
  {
    path: 'tree',
    name: 'Дерево',
    group: 'Данные и раскладка',
    description: 'Иерархические данные со своим шаблоном узла',
    component: TreePageComponent,
  },
  {
    path: 'dropdown',
    name: 'Выпадающий блок',
    group: 'Данные и раскладка',
    description: 'Основа для всех выпадающих списков',
    component: DropdownPageComponent,
  },
  { path: 'icons', name: 'Иконки', group: 'Данные и раскладка', description: 'Все иконки библиотеки', component: IconsPageComponent },

  {
    path: 'modal',
    name: 'Модальные окна',
    group: 'Оверлеи и обратная связь',
    description: 'Окна из шаблона или компонента',
    component: ModalPageComponent,
  },
  {
    path: 'notifications',
    name: 'Уведомления',
    group: 'Оверлеи и обратная связь',
    description: 'Всплывающие сообщения',
    component: NotificationsPageComponent,
  },
  {
    path: 'tooltip',
    name: 'Подсказки',
    group: 'Оверлеи и обратная связь',
    description: 'Подсказки по клику и при наведении',
    component: TooltipPageComponent,
  },
  {
    path: 'spinner',
    name: 'Индикатор загрузки',
    group: 'Оверлеи и обратная связь',
    description: 'Маска загрузки поверх блока',
    component: SpinnerPageComponent,
  },

  {
    path: 'validate',
    name: 'Валидация',
    group: 'Директивы и утилиты',
    description: 'Ошибки и предупреждения у полей',
    component: ValidatePageComponent,
  },
  {
    path: 'utils',
    name: 'Вспомогательные директивы',
    group: 'Директивы и утилиты',
    description: 'Клик снаружи, ограничение ввода, подсветка',
    component: UtilsPageComponent,
  },
];

/** Компоненты библиотеки, для которых страниц пока нет */
export const NOT_DOCUMENTED: { name: string; reason: string }[] = [
  { name: 'itsk-grid, itsk-pager', reason: 'устарели, не используйте в новом коде' },
  { name: 'itsk-filter', reason: 'фильтры таблицы, завязаны на модели itsk-grid' },
  { name: 'itsk-card', reason: 'заготовка без параметров' },
  { name: 'itsk-switch, itsk-carousel, itsk-number-field, itsk-accordion', reason: 'заготовки, не экспортируются из библиотеки' },
];
