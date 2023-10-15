import {Injectable} from '@angular/core';
import {DataModel} from "../model/data-model";
import * as Faker from "faker/locale/ru"
import {Layers} from "../model/layers";
import {Fields} from "../model/fields";
import {ReplaySubject} from "rxjs";
import {FilterType, GridColumn, SelectFilterComponent} from "@grafit/angular";
import {BoolCellComponent} from "../data/data-grid/bool-cell/bool-cell.component";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataArray: DataModel[] = [];
  private dataSub: ReplaySubject<DataModel[]> = new ReplaySubject<DataModel[]>();
  data = this.dataSub.asObservable();

  constructor() {
  }

  createData(length: number) {
    const res = [];

    for (let i = 0; i < length; i++) {
      res.push(new DataModel({
        id: i,
        well: `Скважина ${i}`,
        created: Faker.date.between(new Date(2010, 0, 1), new Date(2020, 0, 1)),
        repair: Faker.date.between(new Date(2010, 0, 1), new Date(2020, 0, 1)),
        layer: Faker.random.number(Layers.length - 1),
        field: Faker.random.number(Fields.length - 1),
        liq: Faker.random.number(100),
        oil: Faker.random.number(90),
        pressure: Faker.random.number(70),
        active: Faker.random.boolean()
      }));
    }
    this.dataArray = res;
    this.dataSub.next(this.dataArray);
  }

  addRow(row: DataModel) {
    this.dataArray.unshift(row);
    this.dataSub.next(this.dataArray);
  }

  getConfig() {
    return [
      new GridColumn({
        name: 'well',
        caption: 'Скважина',
        hint: 'Скважина',
        filterType: FilterType.String
      }), new GridColumn({
        name: 'active',
        caption: 'Действующая',
        hint: 'Действующая',
        filterType: FilterType.List,
        cellComponent: BoolCellComponent,
        filterOptions: [{
          id: true,
          name: 'Действующая'
        }, {
          id: false,
          name: 'Бездействующая'
        }]
      }), new GridColumn({
        name: 'layer',
        caption: 'Пласт',
        hint: 'Пласт',
        filterType: FilterType.List,
        filterComponent: SelectFilterComponent,
        filterOptions: Layers
      }), new GridColumn({
        name: 'field',
        caption: 'Месторождение',
        hint: 'Месторождение',
        flex: 1,
        filterType: FilterType.List,
        filterComponent: SelectFilterComponent,
        filterOptions: Fields
      }), new GridColumn({
        name: 'dates',
        caption: 'Даты',
        hint: 'Даты',
        filterType: FilterType.String,
        columns: [
          new GridColumn({
            name: 'repair',
            width: 180,
            caption: 'Дата ремонта',
            hint: 'Дата ремонта',
            filterType: FilterType.Date
          }),
          new GridColumn({
            name: 'created',
            width: 180,
            caption: 'Дата создания',
            hint: 'Дата создания',
            filterType: FilterType.Date
          })
        ]
      }), new GridColumn({
        name: 'params',
        caption: 'Параметры',
        hint: 'Параметры',
        filterType: FilterType.String,
        columns: [
          new GridColumn({
            name: 'liq',
            caption: 'Qж',
            hint: 'Qж',
            filterType: FilterType.Number
          }),
          new GridColumn({
            name: 'oil',
            caption: 'Qн',
            hint: 'Qн',
            filterType: FilterType.Number
          }),
          new GridColumn({
            name: 'pressure',
            caption: 'Pл',
            hint: 'Pл',
            filterType: FilterType.Number
          })
        ]
      })
    ]
  }
}
