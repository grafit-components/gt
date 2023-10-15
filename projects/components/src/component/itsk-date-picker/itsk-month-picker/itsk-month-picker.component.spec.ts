import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskMonthPickerComponent } from './itsk-month-picker.component';

describe('ItskMonthPickerComponent', () => {
  let component: ItskMonthPickerComponent;
  let fixture: ComponentFixture<ItskMonthPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskMonthPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
