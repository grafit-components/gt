import { Component, OnInit } from '@angular/core';
import {GridColumn, GridOptions, <% if(grouped){%>GroupData<%}else{%>GridRow<%}%>} from '@itsk/ng2-pack';
import { <%= classify(name) %>Service } from './<%=dasherize(name)%>.service';

@Component({
        selector: 'app-<%=dasherize(name)%>',
        templateUrl: '<%=dasherize(name)%>.component.html'
})
export class <%= classify(name) %>Component implements OnInit{
    gridOptions: GridOptions;
    columns: GridColumn[] = [];
    dataTransport: boolean;

    data: <%if(grouped){%>GroupData<%}else{%>GridRow<%}%>[] = [];

    constructor(private service: <%= classify(name) %>Service) {
        this.gridOptions = service.gridOptions;
        this.columns = service.columns;
    }

    ngOnInit() {
        this.service.data.subscribe((data)=> {
            this.data = data;
        });
        this.service.dataTransport.subscribe((data)=> {
            this.dataTransport = data;
        });
    }

    rowSelected = (event: any) => {
        console.log('selected');
    }

    rowDbClicked = (event: any) => {
        console.log('double-clicked');
    }
}
