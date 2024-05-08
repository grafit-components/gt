import { Component } from '@angular/core';
import { IItskMenuItem } from '@grafit/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  menu: IItskMenuItem[] = [
    {
      id: 0,
      parentId: null,
      name: 'Главная',
      url: '/',
      code: 'Home',
      sortOrder: 0,
    },
  ];
}
