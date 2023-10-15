import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ItskPagerConfig} from './model/itsk-pager-config';

@Injectable({
  providedIn: 'root'
})
export class ItskPagerConfigService {
  private default$ = new ItskPagerConfig('Page size', 'Pages count', 'Records count');
  private config$: BehaviorSubject<ItskPagerConfig> = new BehaviorSubject(this.default$);
  public config: Observable<ItskPagerConfig> = this.config$.asObservable();

  constructor() {
  }

  public setConfig(newConfig: ItskPagerConfig) {
    this.config$.next(newConfig);
  }
}
