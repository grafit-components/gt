import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'itsk-file-upload-button',
    templateUrl: './itsk-file-upload-button.component.html',
    styleUrls: ['./itsk-file-upload-button.component.scss'],
    standalone: false
})
export class ItskFileUploadButtonComponent implements OnInit {
  @HostBinding('class.file-upload-button') fileUpload = true;

  @Input() multiple = true;
  @Input() disabled: boolean = false;

  @Output() upload: EventEmitter<FileList> = new EventEmitter();

  @ViewChild('fileUpload', { static: false }) input?: ElementRef;

  files: any;

  constructor() {}

  ngOnInit() {}

  fileChanged(event: any) {
    if (event.target && event.target.files && this.input) {
      this.upload.emit(event.target.files);
      this.input.nativeElement.value = null;
    }
  }
}
