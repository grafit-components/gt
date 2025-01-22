import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatetimeCellComponent } from './datetime-cell.component';

describe('DatetimeCellComponent', () => {
  let component: DatetimeCellComponent;
  let fixture: ComponentFixture<DatetimeCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [DatetimeCellComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
