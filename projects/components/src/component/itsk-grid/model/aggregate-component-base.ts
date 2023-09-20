import {GridRow, IId} from './grid-row';
import {GridColumn} from './grid-column';

export abstract class AggregateComponentBase<T extends IId> {
  abstract locked: boolean;
  abstract data: GridRow<T>;
  abstract columns: GridColumn[];
}
