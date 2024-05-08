import { GridColumn } from './grid-column';
import { GridRow, IId } from './grid-row';

export abstract class AggregateComponentBase<T extends IId> {
  abstract locked: boolean;
  abstract data: GridRow<T>;
  abstract columns: GridColumn[];
}
