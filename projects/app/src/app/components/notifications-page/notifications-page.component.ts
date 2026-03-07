import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimpleComponent } from '../../samples/notifications/simple/simple.component';
import { LevelsComponent } from '../../samples/notifications/levels/levels.component';
import { DurationComponent } from '../../samples/notifications/duration/duration.component';
import { CustomComponentComponent } from '../../samples/notifications/custom-component/custom-component.component';
import { DocViewerComponent } from '../../shared/doc-viewer/doc-viewer.component';
import { SampleComponent, SampleOptions } from '../../shared/sample/sample.component';

@Component({
  selector: 'app-notifications-page',
  imports: [SampleComponent, DocViewerComponent],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsPageComponent {
  basicSample: SampleOptions = {
    title: 'Базовое использование',
    component: SimpleComponent,
    codePaths: ['./samples/notifications/simple/simple.component.ts', './samples/notifications/simple/simple.component.html'],
  };

  levelsSample: SampleOptions = {
    title: 'Уровни уведомлений',
    component: LevelsComponent,
    codePaths: ['./samples/notifications/levels/levels.component.ts', './samples/notifications/levels/levels.component.html'],
  };

  durationSample: SampleOptions = {
    title: 'Длительность уведомлений',
    component: DurationComponent,
    codePaths: ['./samples/notifications/duration/duration.component.ts', './samples/notifications/duration/duration.component.html'],
  };

  customComponentSample: SampleOptions = {
    title: 'Кастомный компонент в уведомлении',
    component: CustomComponentComponent,
    codePaths: [
      './samples/notifications/custom-component/custom-component.component.ts',
      './samples/notifications/custom-component/custom-component.component.html',
      './samples/notifications/custom-component/notification-progress/notification-progress.component.ts',
      './samples/notifications/custom-component/notification-progress/notification-progress.component.html',
    ],
  };
}
