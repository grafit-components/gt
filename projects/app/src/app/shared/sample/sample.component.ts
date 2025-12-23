import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Type } from '@angular/core';
import { ItskIconComponent, ItskTabComponent, ItskTabContentDirective, ItskTabsComponent } from '@grafit/components';
import { DocViewerComponent } from '../doc-viewer/doc-viewer.component';
import { FileNamePipe } from './file-name.pipe';

@Component({
  selector: 'app-sample',
  imports: [
    NgComponentOutlet,
    ItskIconComponent,
    ItskTabsComponent,
    ItskTabComponent,
    ItskTabContentDirective,
    DocViewerComponent,
    FileNamePipe,
  ],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleComponent {
  readonly options = input.required<SampleOptions>();

  protected showCode = false;
}

export interface SampleOptions {
  title: string;
  component: Type<any>;
  codePaths: string[];
}
