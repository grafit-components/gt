import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItskPickerLocaleModel } from '../model/itsk-picker-locale-model';

@Injectable({
  providedIn: 'root',
})
export class PickerLocaleService {
  private _defaults = new ItskPickerLocaleModel({
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
  });

  public locale: BehaviorSubject<ItskPickerLocaleModel> = new BehaviorSubject<ItskPickerLocaleModel>(this._defaults);

  public setLocale(locale: ItskPickerLocaleModel) {
    this.locale.next(locale);
  }

  constructor() {}
}
