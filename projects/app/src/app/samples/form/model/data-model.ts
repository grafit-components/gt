export class DataModel {
  id?: number;
  well?: string;
  layer?: number;
  field?: number;
  repair?: Date;
  created?: Date;
  liq?: number;
  oil?: number;
  pressure?: number;
  active?: boolean;

  constructor(options: {
    id?: number;
    well?: string;
    layer?: number;
    field?: number;
    repair?: Date;
    created?: Date;
    liq?: number;
    oil?: number;
    pressure?: number;
    active?: boolean;
  }) {
    this.id = options.id;
    this.well = options.well;
    this.layer = options.layer;
    this.field = options.field;
    this.repair = options.repair;
    this.created = options.created;
    this.liq = options.liq;
    this.oil = options.oil;
    this.pressure = options.pressure;
    this.active = options.active;
  }
}
