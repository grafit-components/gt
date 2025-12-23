import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimpleComponent } from '../../samples/notifications/simple/simple.component';
import { SampleComponent, SampleOptions } from '../../shared/sample/sample.component';

@Component({
  selector: 'app-notifications-page',
  imports: [SampleComponent],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsPageComponent {
  sampleOptions: SampleOptions = {
    title: 'Создание уведомления',
    component: SimpleComponent,
    codePaths: ['./samples/notifications/simple/simple.component.ts', './samples/notifications/simple/simple.component.html'],
  };
}
