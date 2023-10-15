import {Injectable} from '@angular/core';
import {GridColumn, GridOptions, <%if(grouped){%>GroupData<%}else{%>GridRow<%}%>} from '@itsk/ng2-pack';
import {Observable} from 'rxjs';

@Injectable()
export class <%= classify(name) %>Service {
    gridOptions: GridOptions;
    columns: GridColumn[] = [];

    data: Observable<<% if(grouped){%>GroupData<%}else{%>GridRow<%}%>[]>;
    private _data: Subject<<% if(grouped){%>GroupData<%}else{%>GridRow<%}%>[]>;
    dataTransport: Observable<boolean>;
    private _dataTransport: Subject<boolean>;

    constructor() {
        this.data = this._data;
        this.dataTransport = this._dataTransport;
    }

    <% if(grouped){%>getData = () => {
        this._dataTransport.next(true);
        this._data.next([new GridRow({})]);
        this._dataTransport.next(false);
    }<%}else{%>
    getData = () => {
        this._dataTransport.next(true);
        this._data.next([new GridRow({})]);
        this._dataTransport.next(false);
    }<%}%>
}