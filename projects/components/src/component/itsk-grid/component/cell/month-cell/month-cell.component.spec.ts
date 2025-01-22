import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonthCellComponent } from './month-cell.component';

describe('MonthCellComponent', () => {
  let component: MonthCellComponent<any>;
  let fixture: ComponentFixture<MonthCellComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [MonthCellComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
