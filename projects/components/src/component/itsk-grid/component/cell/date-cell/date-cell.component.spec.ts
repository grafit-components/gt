import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DateCellComponent } from './date-cell.component';

describe('DateCellComponent', () => {
  let component: DateCellComponent;
  let fixture: ComponentFixture<DateCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DateCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
