import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterState } from '../filter-state';
import { GridColumn } from '../grid-column';
import { GridResponse } from '../grid-response';
import { GridRow, IId } from '../grid-row';
import { IDictionary } from '../i-dictionary';

type Ctor<T> = new (...params: any[]) => T;

export abstract class GridPageServiceBase<T extends IId> {
  private dataSubscription?: Subscription;

  protected data$: Subject<GridResponse<T>> = new Subject<GridResponse<T>>();
  data: Observable<GridResponse<T>> = this.data$.asObservable();

  protected dataTransport$: Subject<boolean> = new Subject<boolean>();
  dataTransport: Observable<boolean> = this.dataTransport$.asObservable();

  protected controllerName = 'grid';

  protected getGridAction = 'getGrid';

  protected updateAction = 'update';

  protected deleteAction = 'delete';

  protected getConfigAction = 'getConfig';

  protected prefix = 'api/';

  protected constructor(
    protected http: HttpClient,
    private ctor?: Ctor<T> | null,
    controllerName?: string,
    getGridAction?: string,
    updateAction?: string,
    deleteAction?: string,
    getConfigAction?: string,
    prefix?: string,
  ) {
    this.data$.next(new GridResponse());
    if (controllerName) {
      this.controllerName = controllerName;
    }
    if (getGridAction) {
      this.getGridAction = getGridAction;
    }
    if (updateAction) {
      this.updateAction = updateAction;
    }
    if (deleteAction) {
      this.deleteAction = deleteAction;
    }
    if (getConfigAction) {
      this.getConfigAction = getConfigAction;
    }
  }

  getData(request?: FilterState, additional?: IDictionary) {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    let params = new HttpParams();
    if (additional) {
      for (const key in additional) {
        if (additional.hasOwnProperty(key)) {
          params = params.set(key, additional[key]);
        }
      }
    }
    this.dataTransport$.next(true);
    this.dataSubscription = this.http
      .post(`${this.prefix}${this.controllerName}/${this.getGridAction}`, request, {
        params,
      })
      .pipe(
        map((data: any[any]) => {
          if (this.ctor) {
            data.result = data.result.map((_: any) => {
              return this.ctor && new this.ctor(_);
            });
            return data;
          }
          return data;
        }),
      )
      .subscribe(
        (data: any) => {
          this.data$.next(new GridResponse(data));
          this.dataTransport$.next(false);
        },
        (error) => {
          console.log(error);
          this.dataTransport$.next(false);
        },
      );
  }

  update = (row: GridRow<T>): void => {
    this.dataTransport$.next(true);
    this.http.post(`api/${this.controllerName}/${this.updateAction}`, row.data).subscribe(
      (result: any) => {
        this.dataTransport$.next(false);
        row.id = result.id;
        row.edit = false;
        row.data = Object.assign(row.data, result);
      },
      (error) => {
        this.dataTransport$.next(false);
        console.log(error);
      },
    );
  };

  delete = (row: GridRow<T>, state: FilterState): void => {
    this.dataTransport$.next(true);
    this.http.post(`api/${this.controllerName}/${this.deleteAction}`, row.data.id).subscribe(
      (data: any) => {
        this.dataTransport$.next(false);
      },
      (error) => {
        console.log(error);
        this.dataTransport$.next(false);
      },
    );
  };

  getConfig = (parameters?: IDictionary): Observable<GridColumn[]> => {
    let params = new HttpParams();
    if (parameters) {
      for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          params = params.set(key, parameters[key]);
        }
      }
    }
    return this.http
      .get<any>(`api/${this.controllerName}/${this.getConfigAction}`, {
        params,
      })
      .pipe(
        map((config: any[]) => {
          if (config && config.length) {
            return config.map((column: any) => {
              return new GridColumn(column);
            });
          }
          return [];
        }),
      );
  };
}
