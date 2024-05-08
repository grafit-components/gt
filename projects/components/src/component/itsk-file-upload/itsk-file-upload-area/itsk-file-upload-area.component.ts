import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'itsk-file-upload-area',
  templateUrl: './itsk-file-upload-area.component.html',
  styleUrls: ['./itsk-file-upload-area.component.scss'],
})
export class ItskFileUploadAreaComponent implements OnInit {
  @HostBinding('class.file-upload') fileUpload = true;

  @Input() multiple = true;
  @Input() disabled: boolean = false;

  @Output() upload: EventEmitter<FileList> = new EventEmitter();

  @ViewChild('fileUpload', { static: false }) input: ElementRef | undefined;

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
