import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskDatePickerComponent } from './itsk-date-picker.component';

describe('ItskDatePickerComponent', () => {
  let component: ItskDatePickerComponent;
  let fixture: ComponentFixture<ItskDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskDatePickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
