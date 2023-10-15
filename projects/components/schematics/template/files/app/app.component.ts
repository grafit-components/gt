import {Component} from '@angular/core';
import {ItskMenuItem} from "@grafit/angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  menu: ItskMenuItem[] = [new ItskMenuItem({
    url: '/data',
    name: 'Просмотр данных'
  }), new ItskMenuItem({
    url: '/form',
    name: 'Формы ввода'
  })];
}
