import { Component } from '@angular/core';
import { DocViewerComponent } from '../shared/doc-viewer/doc-viewer.component';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  imports: [DocViewerComponent],
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent {}
