import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { FilterType } from '../../itsk-filter/model/enum/filter-type.enum';
import { GridColumn } from '../model/grid-column';

@Injectable({
  providedIn: 'root',
})
export class FakeDataService {
  constructor() {}

  getData(size: number) {
    const res = [];
    for (let i = 0; i < size; i++) {
      res.push({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        date: faker.date.between(new Date(2010, 0, 1), new Date(2021, 0, 1)),
        value: faker.random.number({ min: 0, max: 100 }),
        summary: faker.random.number({ min: 0, max: 100000 }),
        ram: faker.helpers.randomize([8, 16, 32, 64, 128]),
        address: faker.address.streetAddress(),
        state: faker.address.state(),
        city: faker.address.city(),
        zip: faker.address.zipCode(),
      });
    }
    return res;
  }

  getColumns() {
    return [
      new GridColumn({
        name: 'name',
        flex: 1,
        locked: true,
        filterType: FilterType.String,
      }),
      new GridColumn({
        name: 'date',
        locked: true,
        filterType: FilterType.Date,
      }),
      new GridColumn({
        name: 'value',
        locked: true,
        filterType: FilterType.Number,
      }),
      new GridColumn({
        name: 'summary',
        filterType: FilterType.Number,
      }),
      new GridColumn({
        name: 'ram',
        caption: 'RAM',
        filterType: FilterType.List,
        filterOptions: [
          { id: 8, name: 8 },
          { id: 16, name: 16 },
          { id: 32, name: 32 },
          { id: 64, name: 64 },
          { id: 128, name: 128 },
        ],
      }),
      new GridColumn({
        name: 'location',
        columns: [
          new GridColumn({
            name: 'city',
            filterType: FilterType.String,
          }),
          new GridColumn({
            name: 'state',
            filterType: FilterType.String,
          }),
          new GridColumn({
            name: 'address',
            flex: 2,
            filterType: FilterType.String,
          }),
          new GridColumn({
            name: 'zip',
            filterType: FilterType.String,
          }),
        ],
      }),
    ];
  }
}
