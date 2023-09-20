import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskFileUploadButtonComponent } from './itsk-file-upload-button.component';

describe('ItskFileUploadButtonComponent', () => {
  let component: ItskFileUploadButtonComponent;
  let fixture: ComponentFixture<ItskFileUploadButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskFileUploadButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskFileUploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
