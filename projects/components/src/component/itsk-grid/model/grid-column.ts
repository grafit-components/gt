import { FilterType } from '../../itsk-filter/model/enum/filter-type.enum';
import { ListFilterType } from '../../itsk-filter/model/enum/list-filter-type.enum';
import { StringFilterType } from '../../itsk-filter/model/enum/string-filter-type.enum';
import { FilterColumn } from '../../itsk-filter/model/filter-column';
import { GridRow } from './grid-row';

export class GridColumn extends FilterColumn {
  /** Ширина */
  width = 100;
  /** Коэффициент растяжения ячейки */
  flex = 0;
  /** Высота */
  height?: number;
  /** Высота в шапке таблицы */
  headerHeight?: number;
  /** Стобец закреплен */
  locked: boolean = false;
  /** Название столбца в строке результатов */
  override name: string = '';
  /** Название столбца для заголовка таблицы */
  override caption: string = '';
  /** Единицы измерения */
  unit?: string;
  /** Возможность скрыть столбец */
  disableable: boolean = false;
  /** Список css классов для шапки таблицы */
  headCellClass?: string[];
  /** Список css классов для ячейки таблицы */
  cellClass?: string[];
  /** Дополнительные данные, свободное описание, доступны внутри компонета ячейки, можно прокинуть callback например */
  parameters: any;
  /** Доступно для редактирования */
  editable: boolean = false; // | ((row: GridRow<any>, column: GridColumn) => boolean);
  /** Колонка скрыта */
  hidden: boolean = false;

  /** В данном столбце содержатся объекты */
  objectType: boolean = false;

  /** Компонент для рендера ячейки */
  cellComponent: any;
  /** Компонент для рендера заголовка столбца ячейки */
  headCellComponent: any;
  /** Группировать по этому столбцу */
  groupBy: boolean = false;
  /** Порядок группировки */
  groupingOrder = 0;
  groupByFn: ((row: GridRow<any>) => string) | undefined;
  /** Дочерние колонки */
  // columns: GridColumn[] = [];

  /** Инициализация из анонимного объекта */
  constructor(options?: {
    width?: number;
    flex?: number;
    sortOrder?: number;
    height?: number;
    headerHeight?: number;
    locked?: boolean;
    name?: string;
    caption?: string;
    hint?: string;
    unit?: string;
    sortable?: boolean;
    sortField?: string;
    filterable?: boolean;
    filterField?: string;
    filterType?: FilterType | null;
    stringFilterType?: StringFilterType;
    listFilterType?: ListFilterType;
    strict?: boolean;
    filterOptions?: any[];
    disableable?: boolean;
    headCellClass?: string[];
    cellClass?: string[];
    parameters?: any;
    editable?: boolean;
    hidden?: boolean;
    objectType?: boolean;
    cellComponent?: any;
    headCellComponent?: any;
    filterComponent?: any;
    groupBy?: boolean;
    groupingOrder?: number;
    groupByFn?: (row: GridRow<any>) => string;
    columns?: any[];
  }) {
    super(options);
    if (options) {
      if (options.width && options.width > 0) {
        this.width = options.width;
      }

      if (options.flex) {
        this.flex = options.flex;
      }
      this.sortOrder = options.sortOrder || Number.MAX_VALUE;
      this.height = !options.height ? 28 : options.height;
      this.headerHeight = options.headerHeight || 30;
      this.headCellClass = !options.headCellClass ? [] : options.headCellClass;
      this.cellClass = !options.cellClass ? [] : options.cellClass;
      this.locked = options.locked || false;
      this.name = options.name || '';
      this.caption = options.caption === null || options.caption === undefined ? this.name : options.caption;
      this.unit = options.unit || '';
      this.parameters = options.parameters;
      this.disableable = options.disableable === null || options.disableable === undefined ? true : options.disableable;
      this.editable = options.editable === null || options.editable === undefined ? true : options.editable;
      this.hidden = !this.disableable ? false : options.hidden || false;
      this.objectType = options.objectType || false;

      if (options.columns && options.columns.length) {
        this.columns = [];
        this.columns = options.columns.map((x) => {
          return new GridColumn(x);
        }) as any;
      }

      this.groupBy = options.groupBy ? options.groupBy : false;
      this.groupingOrder = options.groupingOrder ? options.groupingOrder : 0;
      this.groupByFn = options.groupByFn;

      this.headCellComponent = options.headCellComponent;
      this.cellComponent = options.cellComponent;
    }
  }
}
