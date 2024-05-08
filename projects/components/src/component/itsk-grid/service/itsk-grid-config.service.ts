import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItskGridDictionary } from '../model/itsk-grid-dictionary';

@Injectable({
  providedIn: 'root',
})
export class ItskGridConfigService {
  private defaultDict: ItskGridDictionary = new ItskGridDictionary({
    filter: 'Filter',
    apply: 'Apply',
    clear: 'Clear',
    clearFilter: 'Clear filter',
    detail: 'Detail',
    pinColumn: 'Pin column',
    unpinColumn: 'Unpin column',
  });
  private dict$ = new BehaviorSubject<ItskGridDictionary>(this.defaultDict);
  dict = this.dict$.asObservable();

  constructor() {}

  setConfig(newDict: ItskGridDictionary) {
    this.dict$.next(newDict);
  }
}
