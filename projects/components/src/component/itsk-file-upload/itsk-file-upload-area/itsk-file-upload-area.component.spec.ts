import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskFileUploadAreaComponent } from './itsk-file-upload-area.component';

describe('ItskFileUploadAreaComponent', () => {
  let component: ItskFileUploadAreaComponent;
  let fixture: ComponentFixture<ItskFileUploadAreaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskFileUploadAreaComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskFileUploadAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
